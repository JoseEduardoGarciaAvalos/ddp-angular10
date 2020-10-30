import { Component, OnInit } from '@angular/core';
import { DestinoApiClient } from 'src/app/models/destino-api-client-model';
import { DestinoViaje } from 'src/app/models/destino-viaje.models';

export class DestinoApiClientViejo {
  getById(id:String):string {
    return "llamando por la API vieja";
  }
}

@Component({
  selector: 'app-destino-detalle',
  templateUrl: './destino-detalle.component.html',
  styleUrls: ['./destino-detalle.component.css'],
  providers: [
    DestinoApiClient, DestinoApiClientViejo,
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
