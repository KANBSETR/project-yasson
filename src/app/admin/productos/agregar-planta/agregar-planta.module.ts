import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { AgregarPlantaPageRoutingModule } from './agregar-planta-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { AgregarPlantaPage } from './agregar-planta.page';
import { ReactiveFormsModule } from '@angular/forms'


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AgregarPlantaPageRoutingModule,
    SharedModule,
    ReactiveFormsModule,
  ],
  declarations: [AgregarPlantaPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]

})
export class AgregarPlantaPageModule { }
