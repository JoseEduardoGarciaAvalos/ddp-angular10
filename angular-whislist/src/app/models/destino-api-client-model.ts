import { DestinoViaje } from './destino-viaje.models';
import { Store } from '@ngrx/store';
import { AppState } from '../app.module';
import { Injectable } from '@angular/core';

@Injectable()
export class DestinoApiClient {
    constructor(private store: Store<AppState>){}

    getById(id:String):string {
        return "llamando por la API nueva";
    }

    nuevoMetodo(id:String):string {
        return "llamando por la API nueva";
    }
}