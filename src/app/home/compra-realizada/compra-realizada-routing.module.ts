import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CompraRealizadaPage } from './compra-realizada.page';

const routes: Routes = [
  {
    path: '',
    component: CompraRealizadaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CompraRealizadaPageRoutingModule {}
