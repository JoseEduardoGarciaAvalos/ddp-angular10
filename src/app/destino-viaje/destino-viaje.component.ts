import { Component, OnInit, Input, HostBinding, Output, EventEmitter } from '@angular/core';
import { DestinoViaje } from "./../models/destino-viaje.models";

@Component({
  selector: 'app-destino-viaje',
  templateUrl: './destino-viaje.component.html',
  styleUrls: ['./destino-viaje.component.css']
})
export class DestinoViajeComponent implements OnInit {
  @Input() destino: DestinoViaje;
  @Input("idx") posicion: number;
  @Output() clicked: EventEmitter<DestinoViaje> = new EventEmitter<DestinoViaje>();
  @Output() eliminando: EventEmitter<DestinoViaje> = new EventEmitter<DestinoViaje>();
  @Output() voto: EventEmitter<number> = new EventEmitter<number>();
  @HostBinding('attr.class') cssClass = "col-md-6";

  constructor() { 
    //this.nombre = "Nombre por defecto";
  }

  ngOnInit(): void {
  }

  ir(){
    this.clicked.emit(this.destino);
    return false;
  }
  eliminar(){
    this.eliminando.emit(this.destino);
    return false;
  }

  votar(val:number){
    this.voto.emit(val);
    return false;
  }

}
