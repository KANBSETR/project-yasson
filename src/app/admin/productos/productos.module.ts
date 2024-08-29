import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ProductosRoutingModule } from './productos-routing.module';
import { ProductosPage } from './productos.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProductosRoutingModule,
    SharedModule,
  ],
  declarations: [ProductosPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ProductosPageModule {}