import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AgregarPlantaPage } from './agregar-planta.page';

const routes: Routes = [
  {
    path: '',
    component: AgregarPlantaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AgregarPlantaPageRoutingModule {}
