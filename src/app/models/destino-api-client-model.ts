import { BehaviorSubject, Subject } from 'rxjs';
import { DestinoViaje } from './destino-viaje.models';

export class DestinoApiClient {
    private destinos:DestinoViaje[] = [];
    current: Subject<DestinoViaje> = new BehaviorSubject<DestinoViaje>(null);

    constructor(){}

    add(d:DestinoViaje){
        this.destinos.push(d);
    }

    getAll():DestinoViaje[]{
        return this.destinos;
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