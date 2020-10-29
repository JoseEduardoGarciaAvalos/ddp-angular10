import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { DestinoViaje } from "./../models/destino-viaje.models";

@Component({
  selector: 'app-lista-destinos',
  templateUrl: './lista-destinos.component.html',
  styleUrls: ['./lista-destinos.component.css']
})
export class ListaDestinosComponent implements OnInit {
  destinos: DestinoViaje[] = [];
  @Output() onItemAdded: EventEmitter<DestinoViaje> = new EventEmitter<DestinoViaje>();

  constructor() { 
  }

  ngOnInit(): void {
  }

  agregado(d: DestinoViaje) {
    this.destinos.push(d)
    this.onItemAdded.emit(d);
  }

  elegido(destino:DestinoViaje){
    this.destinos.forEach( (x)=> x.setSeleccionado(false));
    destino.setSeleccionado(true);
  }

}
