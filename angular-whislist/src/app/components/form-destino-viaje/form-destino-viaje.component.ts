import { Component, EventEmitter, forwardRef, Inject, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { fromEvent } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, map, switchMap } from "rxjs/operators";
import { ajax } from "rxjs/ajax";
import { DestinoViaje } from '../../models/destino-viaje.models';
import { APP_CONFIG, AppConfig} from "src/app/app.config2";

@Component({
  selector: 'app-form-destino-viaje',
  templateUrl: './form-destino-viaje.component.html',
  styleUrls: ['./form-destino-viaje.component.css']
})
export class FormDestinoViajeComponent implements OnInit {
  @Output() onItemAdded: EventEmitter<DestinoViaje> = new EventEmitter();
  fg: FormGroup;
  minLongitud = 3;
  searchResult: string[] = [];

  // Angular siempre detectaba que habían dependencias cirulares, por lo tanto se creó un archivo intermediario
  constructor(fb: FormBuilder, @Inject(forwardRef(() => APP_CONFIG)) private config: AppConfig) {
    this.fg = fb.group({
      nombre: ['', Validators.compose([
        Validators.required,
        this.nombreValidator,
        this.nombreValidatorParametrizable(this.minLongitud)
      ])],
      url: ['']
    });
    this.fg.valueChanges.subscribe( (form) => {
      //console.log("cambio en el formulario: ", form);
    })
   }

  ngOnInit(): void {
    let elemNombre = <HTMLInputElement>document.getElementById("nombre");
    fromEvent(elemNombre, "input").pipe(
      map( (e:KeyboardEvent) => (e.target as HTMLInputElement).value),
      filter( txt => txt.length > 2),
      debounceTime(200),
      distinctUntilChanged(),
      switchMap((txt) => ajax(this.config.apiEndpoint + "/ciudades?q=" + txt)),
    ).subscribe( ajaxResponse => {
      this.searchResult = ajaxResponse.response;
    });
  }

  guardar(nombre:string, url:string): boolean {
    this.onItemAdded.emit(new DestinoViaje(nombre,url));
    return false;
  }

  nombreValidator(control: FormControl): { [s:string]: boolean } {
    let l = control.value.toString().trim().length;
    if (l>0 && l<5){
      return { invalidNombre: true};
    }
    return null;
  }

  nombreValidatorParametrizable(minLong: number): ValidatorFn {
    return (control: FormControl):  { [s:string]: boolean } | null => {
      let l = control.value.toString().trim().length;
      if (l>0 && l< minLong){
        return { minLongNombre: true};
      }
      return null;
    }
  }

}
