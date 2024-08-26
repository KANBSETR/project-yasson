import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import {MenuAdminComponent} from '../components/menu-admin/menu-admin.component';
import { RouterModule } from '@angular/router';
@NgModule({
  declarations: [MenuAdminComponent],
  imports: [
    CommonModule,
    IonicModule,
    RouterModule,
  ],
  exports: [MenuAdminComponent, IonicModule, RouterModule]
})
export class SharedModule {}
