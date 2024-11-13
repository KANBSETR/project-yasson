import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RcontraPageRoutingModule } from './rcontra-routing.module';

import { RcontraPage } from './rcontra.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RcontraPageRoutingModule
  ],
  declarations: [RcontraPage]
})
export class RcontraPageModule {}
