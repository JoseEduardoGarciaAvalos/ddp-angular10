import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule} from "@angular/forms";

import { AppComponent } from './app.component';
import { DestinoViajeComponent } from './components/destino-viaje/destino-viaje.component';
import { ListaDestinosComponent } from './components/lista-destinos/lista-destinos.component';
import { DestinoDetalleComponent } from './components/destino-detalle/destino-detalle.component';
import { FormDestinoViajeComponent } from './components/form-destino-viaje/form-destino-viaje.component';
import { DestinoApiClient } from './models/destino-api-client-model';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import  * as NgRx from './models/destino-viajes-state.model';

const routes: Routes = [
  { path: "", redirectTo: "home", pathMatch: "full"},
  { path: "home", component: ListaDestinosComponent},
  { path: "destino", component: DestinoDetalleComponent},
];
export interface AppState {
  estado: NgRx.Estado
}

export const reducers = {
  estado: NgRx.reducer
};

@NgModule({
  declarations: [
    AppComponent,
    DestinoViajeComponent,
    ListaDestinosComponent,
    DestinoDetalleComponent,
    FormDestinoViajeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes),
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot([NgRx.Effects])
  ],
  providers: [DestinoApiClient],
  bootstrap: [AppComponent]
})
export class AppModule { }
