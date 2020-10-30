import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.module';
import { DestinoApiClient } from '../../models/destino-api-client-model';
import { DestinoViaje } from "./../../models/destino-viaje.models";
import  * as NgRx from '../../models/destino-viajes-state.model';

@Component({
  selector: 'app-lista-destinos',
  templateUrl: './lista-destinos.component.html',
  styleUrls: ['./lista-destinos.component.css']
})
export class ListaDestinosComponent implements OnInit {
  updates: string[] = [];
  viajes: DestinoViaje[];

  constructor(public destinoApiClient:DestinoApiClient, private store: Store<AppState>) { 
    this.store.select(state => state.estado.favorito).subscribe((d:DestinoViaje)=>{ 
        if( d != null){
        this.updates.push("Se ha elegido a " + d.nombre)
      }
    });
    this.store.select(state => state.estado.destinos).subscribe((d:DestinoViaje[])=>{ 
      this.viajes = d;
    });
  }

  ngOnInit(): void {
  }

  // Se ejecuta al dar click en el boton "Guardar" del formulario
  agregado(d: DestinoViaje) {
    this.store.dispatch(new NgRx.Nuevo(d));
  }

  // Se ejecuta al dar click en el boton Ir! del componente hijo
  elegido(d:DestinoViaje){
    console.log("elegido", d)
    //this.destinoApiClient.elegir(d);
    //d.setSeleccionado(true);
    this.store.dispatch(new NgRx.Favorito(d));
  }

  // Se ejecuta al dar click en el boton "Me gusta" o "No megusta" del componente hijo
  votado(d:DestinoViaje, val:number){
    this.store.dispatch(new NgRx.Voto(d,val));
  }
   // Se ejecuta al dar click en el boton "Eliminar" del componente hijo
  eliminado(d:DestinoViaje){
    this.store.dispatch(new NgRx.Elimina(d));
  }

}
