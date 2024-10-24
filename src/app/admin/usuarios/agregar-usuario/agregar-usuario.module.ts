import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { AgregarUsuarioPageRoutingModule } from './agregar-usuario-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { AgregarUsuarioPage } from './agregar-usuario.page';
import { ReactiveFormsModule } from '@angular/forms'
import { FirestoreServiceRoles } from '../../services/roles/rol.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AgregarUsuarioPageRoutingModule,
    SharedModule,
    ReactiveFormsModule,
  ],
  declarations: [AgregarUsuarioPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [FirestoreServiceRoles]

})
export class AgregarUsuarioPageModule {}
