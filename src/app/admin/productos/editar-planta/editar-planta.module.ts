import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditarPlantaPageRoutingModule } from './editar-planta-routing.module';

import { EditarPlantaPage } from './editar-planta.page';
import { ReactiveFormsModule } from '@angular/forms';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditarPlantaPageRoutingModule,
    ReactiveFormsModule,
  ],
  declarations: [EditarPlantaPage]
})
export class EditarPlantaPageModule {}
