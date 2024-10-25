import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UsuariosPageRoutingModule } from './usuarios-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { UsuariosPage } from './usuarios.page';
import { VisualizarUsuarioComponent } from './modal-usuarios/visualizar-usuario.component'; // Importar el componente

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UsuariosPageRoutingModule,
    SharedModule
  ],
  declarations: [
    UsuariosPage,
    VisualizarUsuarioComponent // Declarar el componente
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class UsuariosPageModule {}