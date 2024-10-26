import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ArduinoPageRoutingModule } from './arduino-routing.module';

import { ArduinoPage } from './arduino.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ArduinoPageRoutingModule
  ],
  declarations: [ArduinoPage]
})
export class ArduinoPageModule {}
