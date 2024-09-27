import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UsuariosPageRoutingModule } from './usuarios-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { UsuariosPage } from './usuarios.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UsuariosPageRoutingModule,
    SharedModule
  ],
  declarations: [UsuariosPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class UsuariosPageModule {}
