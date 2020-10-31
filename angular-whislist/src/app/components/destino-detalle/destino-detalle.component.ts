import { Component, Inject, Injectable, InjectionToken, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.module';
import { DestinoApiClient, DestinoApiClientV2 } from 'src/app/models/destino-api-client-model';
import { DestinoViaje } from 'src/app/models/destino-viaje.models';

export class DestinoApiClientViejo {
  getById(id:String):string {
    return "llamando por la API vieja";
  }
}

interface AppConfig {
  apiEndpoint: string;
}
const APP_CONFIG_VALUE: AppConfig = {
  apiEndpoint: "mi_api.com"
}

const APP_CONFIG = new InjectionToken<AppConfig>("app.config");

@Injectable()
export class DestinoApiClientDecorated extends DestinoApiClientV2 {
  constructor(@Inject(APP_CONFIG) private config:AppConfig, store: Store<AppState>){
    super(store);
  }

  getById(id:String):string {
    console.log("llamando por la API decorada. config: ", this.config.apiEndpoint);
    return super.getById(id) + " y llamando por la API decorada";
  }
}

@Component({
  selector: 'app-destino-detalle',
  templateUrl: './destino-detalle.component.html',
  styleUrls: ['./destino-detalle.component.css'],
  providers: [
    {provide: APP_CONFIG, useValue: APP_CONFIG_VALUE},
    {provide: DestinoApiClient, useClass: DestinoApiClientDecorated},
    {provide: DestinoApiClientViejo, useExisting: DestinoApiClient}
  ]
})
export class DestinoDetalleComponent implements OnInit {
  destino:string;

  constructor(public destinoApiClient:DestinoApiClientViejo) { }

  ngOnInit(): void {
    this.destino = this.destinoApiClient.getById("FIJO");
  }

}
