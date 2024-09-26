import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AgregarCategoriaPageRoutingModule } from './agregar-categoria-routing.module';

import { AgregarCategoriaPage } from './agregar-categoria.page';
import { ReactiveFormsModule } from '@angular/forms';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AgregarCategoriaPageRoutingModule,
    ReactiveFormsModule,
  ],
  declarations: [AgregarCategoriaPage]
})
export class AgregarCategoriaPageModule {}
