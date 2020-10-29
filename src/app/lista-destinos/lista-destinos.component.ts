import { Component, OnInit } from '@angular/core';
import { DestinoViaje } from "./../models/destino-viaje.models";

@Component({
  selector: 'app-lista-destinos',
  templateUrl: './lista-destinos.component.html',
  styleUrls: ['./lista-destinos.component.css']
})
export class ListaDestinosComponent implements OnInit {
  destinos: DestinoViaje[] = [];

  paises: String[] = ["Costa Rica", "Bolivia", "España"];
  constructor() { 
  }

  ngOnInit(): void {
  }

  guardar(nombre:string, url:string): boolean{
    this.destinos.push(new DestinoViaje(nombre,url))
    console.log(this.destinos);
    return false;
  }

  elegido(destino:DestinoViaje){
    this.destinos.forEach( (x)=> x.setSeleccionado(false));
    destino.setSeleccionado(true);
  }

}
