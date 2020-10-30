import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule} from "@angular/forms";

import { AppComponent } from './app.component';
import { DestinoViajeComponent } from './destino-viaje/destino-viaje.component';
import { ListaDestinosComponent } from './lista-destinos/lista-destinos.component';
import { DestinoDetalleComponent } from './destino-detalle/destino-detalle.component';
import { FormDestinoViajeComponent } from './form-destino-viaje/form-destino-viaje.component';
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

// redux init
// export interface AppState {
//    product: Product[];
// }

// export const reducers: ActionReducerMap<AppState> = {
//   product: addProductReducer
// };


// // redux init
// export interface AppState {
//   destinos: DestinoViajesState
// }

// const reducers: ActionReducerMap<AppState> = {
//   destinos: reducerDestinosViajes
// };

// let reducersInitialState = {
//   destinos: inializeDestinosViajesState()
// }
//redux fin init
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
    //NgRxStoreModule.forRoot(reducers, { initialState: reducersInitialState}),
    // EffectsModule.forRoot([DestinosViajesEffects])
  ],
  providers: [DestinoApiClient],
  bootstrap: [AppComponent]
})
export class AppModule { }
