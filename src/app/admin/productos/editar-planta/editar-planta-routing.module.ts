import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditarPlantaPage } from './editar-planta.page';

const routes: Routes = [
  {
    path: '',
    component: EditarPlantaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditarPlantaPageRoutingModule {}
