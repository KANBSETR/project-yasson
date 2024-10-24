import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModificarRolesPageRoutingModule } from './modificar-roles-routing.module';

import { ModificarRolesPage } from './modificar-roles.page';
import { ReactiveFormsModule } from '@angular/forms';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModificarRolesPageRoutingModule,
    ReactiveFormsModule,
  ],
  declarations: [ModificarRolesPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]

})
export class ModificarRolesPageModule {}
