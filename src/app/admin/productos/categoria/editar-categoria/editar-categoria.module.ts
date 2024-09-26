import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditarCategoriaPageRoutingModule } from './editar-categoria-routing.module';

import { EditarCategoriaPage } from './editar-categoria.page';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditarCategoriaPageRoutingModule,
    ReactiveFormsModule,
  ],
  declarations: [EditarCategoriaPage]
})
export class EditarCategoriaPageModule {}
