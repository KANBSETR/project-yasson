import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModificarRolesPage } from './modificar-roles.page';

const routes: Routes = [
  {
    path: '',
    component: ModificarRolesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModificarRolesPageRoutingModule {}
