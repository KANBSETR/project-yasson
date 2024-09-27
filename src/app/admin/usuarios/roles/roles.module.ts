import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RolesPageRoutingModule } from './roles-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { RolesPage } from './roles.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RolesPageRoutingModule,
    SharedModule
  ],
  declarations: [RolesPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class RolesPageModule {}
