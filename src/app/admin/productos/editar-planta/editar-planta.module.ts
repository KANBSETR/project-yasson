import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditarPlantaPageRoutingModule } from './editar-planta-routing.module';

import { EditarPlantaPage } from './editar-planta.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditarPlantaPageRoutingModule
  ],
  declarations: [EditarPlantaPage]
})
export class EditarPlantaPageModule {}
