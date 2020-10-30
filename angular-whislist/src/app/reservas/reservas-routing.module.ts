import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReservasDetailComponent } from './reservas-detail/reservas-detail.component';
import { ReservasListComponent } from './reservas-list/reservas-list.component';

const routes: Routes = [
  {path:"reservas", component: ReservasListComponent},
  {path:"reservas/:id", component: ReservasDetailComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReservasRoutingModule { }
