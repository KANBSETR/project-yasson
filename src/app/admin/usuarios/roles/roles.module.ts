import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { RolesPageRoutingModule } from './roles-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { RolesPage } from './roles.page';
import { VisualizarRolComponent } from './modal-roles/visualizar-rol.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RolesPageRoutingModule,
    SharedModule,
    RouterModule.forChild([{ path: '', component: RolesPage }])
  ],
  declarations: [RolesPage, VisualizarRolComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  
})
export class RolesPageModule {}
