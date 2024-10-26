import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeUsuarioPage } from './home-usuario.page';

const routes: Routes = [
  {
    path: '',
    component: HomeUsuarioPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeUsuarioPageRoutingModule {}
