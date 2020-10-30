import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { DestinoViaje } from './destino-viaje.models';
import { Store } from '@ngrx/store';
import { AppState } from '../app.module';
import { Injectable } from '@angular/core';

@Injectable()
export class DestinoApiClient {
    private destinos:DestinoViaje[] = [];
    current: Subject<DestinoViaje> = new BehaviorSubject<DestinoViaje>(null);

    constructor(private store: Store<AppState>){}

    add(d:DestinoViaje){
        this.destinos.push(d);
    }

    getAll(){
        return this.store.select(state => state.estado.destinos);
    }

    getById(id:String): DestinoViaje {
        return null; //this.destinos.filter( d => return );
    }

    elegir(d: DestinoViaje) {
        this.destinos.forEach( x => x.setSeleccionado(false));
        d.setSeleccionado(true);
        this.current.next(d);
    }

    subscribeOnChange(fn) {
        this.current.subscribe(fn);
    }

}