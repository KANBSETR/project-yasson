import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ModificarUsuarioPage } from './modificar-usuarios.page';

const routes: Routes = [
  {
    path: '',
    component: ModificarUsuarioPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModificarUsuariosPageRoutingModule {}