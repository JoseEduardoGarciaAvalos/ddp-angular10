import { Injectable, InjectionToken } from '@angular/core';
import Dexie from "dexie";
import { DestinoViaje } from './models/destino-viaje.models';

export interface AppConfig {
    apiEndpoint: string;
  }
export const APP_CONFIG_VALUE: AppConfig = {
    apiEndpoint: "http://localhost:3000"
}
  
export const APP_CONFIG = new InjectionToken<AppConfig>("app.config2");


@Injectable({
  providedIn: "root"
})
export class MiBaseDatos extends Dexie{
  destinos: Dexie.Table<DestinoViaje, number>;

  constructor(){
    super("MiBaseDatos");
    this.version(1).stores({
      destinos: "++id, nombre, imagenUrl",
    });
  }
}
  
  