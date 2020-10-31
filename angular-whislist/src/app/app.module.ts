import { BrowserModule } from '@angular/platform-browser';
import { APP_INITIALIZER, Injectable, NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule} from "@angular/forms";
import { HttpClient, HttpClientModule, HttpHeaders, HttpRequest } from '@angular/common/http';

import { AppComponent } from './app.component';
import { DestinoViajeComponent } from './components/destino-viaje/destino-viaje.component';
import { ListaDestinosComponent } from './components/lista-destinos/lista-destinos.component';
import { DestinoDetalleComponent } from './components/destino-detalle/destino-detalle.component';
import { FormDestinoViajeComponent } from './components/form-destino-viaje/form-destino-viaje.component';
//import { DestinoApiClient } from './models/destino-api-client-model';
import { EffectsModule } from '@ngrx/effects';
import { Store, StoreModule } from '@ngrx/store';
import  * as NgRx from './models/destino-viajes-state.model';
import { LoginComponent } from './components/login/login/login.component';
import { ProtectedComponent } from './components/protected/protected/protected.component';
import { UsuarioLogueadoGuard } from './guards/usuario-logueado/usuario-logueado.guard';
import { AuthService } from './services/auth.service';
import { VuelosComponent } from './components/vuelos/vuelos/vuelos.component';
import { VuelosMainComponent } from './components/vuelos/vuelos-main/vuelos-main.component';
import { VuelosInfoComponent } from './components/vuelos/vuelos-info/vuelos-info.component';
import { VuelosDetalleComponent } from './components/vuelos/vuelos-detalle/vuelos-detalle.component';
import { ReservasModule } from './reservas/reservas.module';
import { APP_CONFIG, APP_CONFIG_VALUE, MiBaseDatos } from './app.config2';


export const childrenVuelos: Routes = [
  {path: "", redirectTo: "main", pathMatch:"full"},
  {path:"main", component: VuelosMainComponent},
  {path:"mas-info", component: VuelosInfoComponent},
  {path:":id", component: VuelosDetalleComponent},
];

const routes: Routes = [
  { path: "", redirectTo: "home", pathMatch: "full"},
  { path: "home", component: ListaDestinosComponent},
  { path: "destino", component: DestinoDetalleComponent},
  { path: "login", component: LoginComponent},
  { path: "protected", component: ProtectedComponent, canActivate: [UsuarioLogueadoGuard]},
  { path: "vuelos", component: VuelosComponent, canActivate: [UsuarioLogueadoGuard],
    children: childrenVuelos
  },
  {path: "**",  redirectTo: "home"}

];
export interface AppState {
  estado: NgRx.Estado
}

export const reducers = {
  estado: NgRx.reducer
};

export function inti_app(appLoadService: AppLoadService): () => Promise<any> {
  return () => appLoadService.inicializarState();
}

@Injectable()
class AppLoadService {
  constructor(private store: Store<AppState>,  private http: HttpClient) {}
  async inicializarState(): Promise<any> {
    const cabecera: HttpHeaders = new HttpHeaders({
      "X-API-TOKEK": "token-seguridad"
    });
    try{
      const req = new HttpRequest("GET", APP_CONFIG_VALUE.apiEndpoint + "/my", {headers: cabecera});
      const res: any = await this.http.request(req).toPromise();
      if(res.body) this.store.dispatch(new NgRx.Inicial(res.body));
    } catch(e){;}
  }
}

@NgModule({
  declarations: [
    AppComponent,
    DestinoViajeComponent,
    ListaDestinosComponent,
    DestinoDetalleComponent,
    FormDestinoViajeComponent,
    LoginComponent,
    ProtectedComponent,
    VuelosComponent,
    VuelosMainComponent,
    VuelosInfoComponent,
    VuelosDetalleComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes),
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot([NgRx.Effects]),
    ReservasModule,
    HttpClientModule
  ],
  providers: [AuthService, UsuarioLogueadoGuard,
    {provide: APP_CONFIG, useValue: APP_CONFIG_VALUE},
    AppLoadService,
    {provide: APP_INITIALIZER, useFactory: inti_app, deps: [AppLoadService], multi: true},
    MiBaseDatos,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
