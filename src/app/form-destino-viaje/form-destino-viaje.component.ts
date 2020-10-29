import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DestinoViaje } from '../models/destino-viaje.models';

@Component({
  selector: 'app-form-destino-viaje',
  templateUrl: './form-destino-viaje.component.html',
  styleUrls: ['./form-destino-viaje.component.css']
})
export class FormDestinoViajeComponent implements OnInit {
  @Output() onItemAdded: EventEmitter<DestinoViaje> = new EventEmitter();
  fg: FormGroup;

  constructor(fb: FormBuilder) {
    this.fg = fb.group({
      nombre: ['', Validators.required],
      url: ['']
    });
    this.fg.valueChanges.subscribe( (form) => {
      console.log("cambio en el formulario: ", form);
    })
   }

  ngOnInit(): void {
  }

  guardar(nombre:string, url:string): boolean {
    this.onItemAdded.emit(new DestinoViaje(nombre,url));
    return false;
  }

}
