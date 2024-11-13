import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import {MenuAdminComponent} from '../components/menu-admin/menu-admin.component';
import { RouterModule } from '@angular/router';
import { ProductsComponent } from '../components/products/products.component';
import { MenuHomeComponent } from '../components/menu-home/menu-home.component';
import { MenuTabComponent } from '../components/menu-tab/menu-tab.component';
import { CustomInputComponent } from '../components/custom-input/custom-input.component';
import { ReactiveFormsModule } from '@angular/forms';
@NgModule({
  declarations: [MenuAdminComponent, ProductsComponent, MenuHomeComponent,MenuTabComponent, CustomInputComponent], //Declarar el componente que se quiere compartir (Necesario)
  imports: [
    CommonModule,
    IonicModule,
    RouterModule,
    ReactiveFormsModule
  ],
  exports: [MenuAdminComponent, ProductsComponent, MenuHomeComponent,MenuTabComponent, CustomInputComponent, ReactiveFormsModule] //Exportar el componente que se quiere compartir (Necesario)
})
export class SharedModule {}
