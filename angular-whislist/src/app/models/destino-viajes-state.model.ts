import { Injectable } from '@angular/core';
import { Action, createAction, createReducer, props, on } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { DestinoViaje } from './destino-viaje.models';


// ESTADO
export interface Estado{
    destinos: DestinoViaje[];
    cargando: boolean;
    favorito: DestinoViaje;
}
// ESTADO INICIAL
export const inicialEstado: Estado = {
    destinos: [new DestinoViaje("España",""), new DestinoViaje("Colombia","")],     // Son datos mocks
    cargando: false,
    favorito: null
};
//ACCIONES
export enum TiposAcciones {
    INICIAL_DESTINO = '[Destinos Viajes] Inicial',
    NUEVO_DESTINO = '[Destinos Viajes] Nuevo',
    ELIMINA_DESTINO = '[Destinos Viajes] Elimina',
    VOTO_DESTINO = '[Destinos Viajes] Voto',
    ELEGIDO_FAVORITO = '[Destinos Viajes] Favorito'
}
export class Inicial implements Action {
    type = TiposAcciones.INICIAL_DESTINO;

    constructor(public objetivo: string[]) { }
}

export class Nuevo implements Action {
    type = TiposAcciones.NUEVO_DESTINO;

    constructor(public objetivo: DestinoViaje) { }
}
export class Elimina implements Action {
    type = TiposAcciones.ELIMINA_DESTINO;

    constructor(public objetivo: DestinoViaje) { }
}
export class Voto implements Action {
    type = TiposAcciones.VOTO_DESTINO;

    constructor(public objetivo: DestinoViaje, public cantidad: number) { }
}
export class Favorito implements Action {
    type = TiposAcciones.ELEGIDO_FAVORITO;

    constructor(public objetivo: DestinoViaje) { }
}

export type Acciones = Nuevo | Elimina | Favorito | Voto | Inicial;


export function reducer(estado = inicialEstado, accion: Acciones): Estado {
    switch (accion.type) {
        case TiposAcciones.INICIAL_DESTINO: {
            console.log(accion.type)
            const paises: string[] = (accion as Inicial).objetivo;
            return {
                ...estado,
                destinos: [...estado.destinos, ...paises.map((d) => new DestinoViaje(d,""))]
            };
        }
        case TiposAcciones.NUEVO_DESTINO: {
            return {
                ...estado,
                destinos: [...estado.destinos, (accion as Nuevo).objetivo]
            };
        }
        case TiposAcciones.ELIMINA_DESTINO: {
            //Encontrar el indice
            var index = estado.destinos.findIndex( x => x== (accion as Nuevo).objetivo);
            //Crear el nuevo objeto
            var nuevos = [
                ...estado.destinos.slice(0,index),
                ...estado.destinos.slice(index+1,estado.destinos.length)
            ]
            return {
                ...estado,
                destinos: nuevos
            };
        }
        case TiposAcciones.VOTO_DESTINO: {
            var nuevos:DestinoViaje[] = [];
            estado.destinos.forEach(x => {
                let nuevo = new DestinoViaje(x.nombre,x.imagenUrl,x.voto);
                if((accion as Voto).objetivo == x)  nuevo.voto += (accion as Voto).cantidad;
                if(nuevo.voto<0) nuevo.voto = 0;
                nuevos.push(nuevo);
            });
            return {
                ...estado,
                destinos: nuevos
            };
        }
        case TiposAcciones.ELEGIDO_FAVORITO: {
            /* ERROR TypeError: Cannot add property selected, object is not extensible
            Mantener la inmutabilidad de los datos en el store es parte del patrón redux
            Por lo tanto las siguientes lineas comentadas no surten efecto:*/
            // estado.destinos.forEach(x => x.setSeleccionado(false));
            // const fav: DestinoViaje = (accion as Favorito).objetivo;
            // fav.setSeleccionado(true);
            var nuevos:DestinoViaje[] = [];
            estado.destinos.forEach(x => {
                let nuevo = new DestinoViaje(x.nombre,x.imagenUrl,x.voto);
                if((accion as Favorito).objetivo == x)  nuevo.setSeleccionado(true);
                else nuevo.setSeleccionado(false);
                nuevos.push(nuevo);
            });
            return {
                ...estado,
                destinos: nuevos,
                favorito: (accion as Favorito).objetivo
            };
        }
        default: {
            return estado;
        }
    }
}
// EFECTS agregado de angular
@Injectable()
export class Effects {
    @Effect()
    nuevoAgregado$: Observable<Action> = this.acciones$.pipe(
        ofType(TiposAcciones.NUEVO_DESTINO),
        map((accion: Nuevo) => new Favorito(accion.objetivo)),
    );

    constructor(private acciones$: Actions) {}
}