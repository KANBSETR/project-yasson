import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PlantaUsuarioPage } from './planta-usuario.page';

const routes: Routes = [
  {
    path: '',
    component: PlantaUsuarioPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PlantaUsuarioPageRoutingModule {}
