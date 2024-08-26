import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import {MenuAdminComponent} from '../components/menu-admin/menu-admin.component';
import { RouterModule } from '@angular/router';
import { ProductsComponent } from '../components/products/products.component';
@NgModule({
  declarations: [MenuAdminComponent, ProductsComponent], //Declarar el componente que se quiere compartir
  imports: [
    CommonModule,
    IonicModule,
    RouterModule,
  ],
  exports: [MenuAdminComponent, ProductsComponent] //Exportar el componente que se quiere compartir
})
export class SharedModule {}
