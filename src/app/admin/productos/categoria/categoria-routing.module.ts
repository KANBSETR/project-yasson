import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CategoriaPage } from './categoria.page';

const routes: Routes = [
  {
    path: '',
    component: CategoriaPage
  },
  {
    path: 'agregar-categoria',
    loadChildren: () => import('./agregar-categoria/agregar-categoria.module').then( m => m.AgregarCategoriaPageModule)
  },
  {
    path: 'editar-categoria/:id',
    loadChildren: () => import('./editar-categoria/editar-categoria.module').then( m => m.EditarCategoriaPageModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CategoriaPageRoutingModule {}
