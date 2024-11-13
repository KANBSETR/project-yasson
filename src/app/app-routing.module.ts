import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { ModificarRolesPage } from './admin/usuarios/roles/modificar-roles/modificar-roles.page';
const routes: Routes = [
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module').then( m => m.HomePageModule)
  },
  {
    path: 'admin/usuarios/roles/editar-rol/:id',
    component: ModificarRolesPage
  },
  {
    path: '', //Si el path es vacio, redirige a admin
    redirectTo: 'home', //Redirige a home
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./auth/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'registro',
    loadChildren: () => import('./auth/registro/registro.module').then( m => m.RegistroPageModule)
  },
  {
    path: 'home-usuario',
    loadChildren: () => import('./usuario/home-usuario/home-usuario.module').then( m => m.HomeUsuarioPageModule)
  },
  {
    path: 'reportes',
    loadChildren: () => import('./usuario/reportes/reportes.module').then( m => m.ReportesPageModule)
  },
  {
    path: 'arduino',
    loadChildren: () => import('./usuario/arduino/arduino.module').then( m => m.ArduinoPageModule)
  },
  {
    path: 'planta-usuario',
    loadChildren: () => import('./usuario/planta-usuario/planta-usuario.module').then( m => m.PlantaUsuarioPageModule)
  },
  {
    path: 'rcontra',
    loadChildren: () => import('./auth/rcontra/rcontra.module').then( m => m.RcontraPageModule)
  },


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
