import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReservasRoutingModule } from './reservas-routing.module';
import { ReservasListComponent } from './reservas-list/reservas-list.component';
import { ReservasDetailComponent } from './reservas-detail/reservas-detail.component';
import { ReservasApiClientService } from './reservas-api-client.service';


@NgModule({
  declarations: [ReservasListComponent, ReservasDetailComponent],
  imports: [
    CommonModule,
    ReservasRoutingModule
  ],
  providers: [ReservasApiClientService]
})
export class ReservasModule { }
