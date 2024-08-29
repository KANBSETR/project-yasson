import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import {MenuAdminComponent} from '../components/menu-admin/menu-admin.component';
import { RouterModule } from '@angular/router';
import { ProductsComponent } from '../components/products/products.component';
import { MenuHomeComponent } from '../components/menu-home/menu-home.component';
@NgModule({
  declarations: [MenuAdminComponent, ProductsComponent, MenuHomeComponent], //Declarar el componente que se quiere compartir (Necesario)
  imports: [
    CommonModule,
    IonicModule,
    RouterModule,
  ],
  exports: [MenuAdminComponent, ProductsComponent, MenuHomeComponent] //Exportar el componente que se quiere compartir (Necesario)
})
export class SharedModule {}
