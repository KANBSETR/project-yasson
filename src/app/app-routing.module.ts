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
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'registro',
    loadChildren: () => import('./registro/registro.module').then( m => m.RegistroPageModule)
  },  {
    path: 'home-usuario',
    loadChildren: () => import('./usuario/home-usuario/home-usuario.module').then( m => m.HomeUsuarioPageModule)
  },
  {
    path: 'reportes',
    loadChildren: () => import('./usuario/reportes/reportes.module').then( m => m.ReportesPageModule)
  },
  {
    path: 'visualizar',
    loadChildren: () => import('./usuario/visualizar/visualizar.module').then( m => m.VisualizarPageModule)
  },
  {
    path: 'arduino',
    loadChildren: () => import('./usuario/arduino/arduino.module').then( m => m.ArduinoPageModule)
  },
  {
    path: 'estado-planta',
    loadChildren: () => import('./usuario/estado-planta/estado-planta.module').then( m => m.EstadoPlantaPageModule)
  },
  {
    path: 'planta-usuario',
    loadChildren: () => import('./usuario/planta-usuario/planta-usuario.module').then( m => m.PlantaUsuarioPageModule)
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
