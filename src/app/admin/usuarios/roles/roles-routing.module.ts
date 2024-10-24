import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RolesPage } from './roles.page';

const routes: Routes = [
  {
    path: '',
    component: RolesPage
  },
  {
    path: 'agregar-rol',
    loadChildren: () => import('./agregar-rol/agregar-rol.module').then( m => m.AgregarRolPageModule)
  },  {
    path: 'modificar-roles',
    loadChildren: () => import('./modificar-roles/modificar-roles.module').then( m => m.ModificarRolesPageModule)
  }


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RolesPageRoutingModule {}
