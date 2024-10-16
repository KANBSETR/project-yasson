import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModificarUsuariosPageRoutingModule } from './modificar-usuarios-routing.module';

import { ModificarUsuarioPage } from './modificar-usuarios.page';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModificarUsuariosPageRoutingModule,
    ReactiveFormsModule,
  ],
  declarations: [ModificarUsuarioPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]

})
export class ModificarUsuariosPageModule {}
