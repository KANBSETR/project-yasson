import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PlantaUsuarioPageRoutingModule } from './planta-usuario-routing.module';

import { PlantaUsuarioPage } from './planta-usuario.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PlantaUsuarioPageRoutingModule
  ],
  declarations: [PlantaUsuarioPage]
})
export class PlantaUsuarioPageModule {}
