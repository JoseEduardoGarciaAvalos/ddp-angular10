import { DestinoViaje } from './destino-viaje.models';
import { Store } from '@ngrx/store';
import  * as NgRx from 'src/app/models/destino-viajes-state.model';
import { AppState } from '../app.module';
import { forwardRef, Inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest, HttpResponse } from '@angular/common/http';
import { AppConfig, APP_CONFIG, MiBaseDatos } from '../app.config2';

@Injectable()
export class DestinoApiClient {
    constructor(
        private store: Store<AppState>,
        @Inject(forwardRef(()=> APP_CONFIG)) private config: AppConfig,
        private http:HttpClient,
        private db:MiBaseDatos
    ) { }

    getById(id: String): string {
        return "llamando por la API nueva";
    }

    nuevoMetodo(id: String): string {
        return "llamando por la API nueva";
    }
    add(d: DestinoViaje) {
        const cabecera: HttpHeaders = new HttpHeaders({
            "X-API-TOKEK": "token-seguridad"
        });
        const req = new HttpRequest("POST", this.config.apiEndpoint + "/my", {nuevo: d.nombre} ,{ headers: cabecera });
        this.http.request(req).subscribe((data: HttpResponse<{}>) => {
            if(data.status === 200){
                this.store.dispatch(new NgRx.Nuevo(d));
                const miBD = this.db;
                miBD.destinos.add(d);
                console.log("Todos los destinos de la DB!");
                miBD.destinos.toArray().then(x => console.log(x));
            }
        });
    }
}
@Injectable()
export class DestinoApiClientV2 {
    constructor( private store: Store<AppState>) { }

    getById(id: String): string {
        return "llamando por la API nueva";
    }

    nuevoMetodo(id: String): string {
        return "llamando por la API nueva";
    }
}