import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { DestinoApiClient } from '../models/destino-api-client-model';
import { DestinoViaje } from "./../models/destino-viaje.models";

@Component({
  selector: 'app-lista-destinos',
  templateUrl: './lista-destinos.component.html',
  styleUrls: ['./lista-destinos.component.css']
})
export class ListaDestinosComponent implements OnInit {
  @Output() onItemAdded: EventEmitter<DestinoViaje> = new EventEmitter<DestinoViaje>();
  updates: string[] = [];
  constructor(public destinoApiClient:DestinoApiClient) { 
    this.destinoApiClient.subscribeOnChange((d:DestinoViaje) => {
      if( d != null){
        this.updates.push("Se ha elegido a " + d.nombre)
      }
    });
  }

  ngOnInit(): void {
  }

  agregado(d: DestinoViaje) {
    this.destinoApiClient.add(d);
    this.onItemAdded.emit(d);
  }

  elegido(destino:DestinoViaje){
    this.destinoApiClient.elegir(destino);
  }

}
