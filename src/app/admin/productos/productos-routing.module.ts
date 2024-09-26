import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductosPage } from './productos.page';

const routes: Routes = [
  {
    path: '',
    component: ProductosPage
  },
  {
    path: 'categoria',
    loadChildren: () => import('./categoria/categoria.module').then(m => m.CategoriaPageModule)
  },
  {
    path: 'agregar-planta',
    loadChildren: () => import('./agregar-planta/agregar-planta.module').then(m => m.AgregarPlantaPageModule)
  },
  {
    path: 'editar-planta/:id',
    loadChildren: () => import('./editar-planta/editar-planta.module').then( m => m.EditarPlantaPageModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductosRoutingModule {}
