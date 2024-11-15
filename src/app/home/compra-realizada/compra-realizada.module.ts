import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CompraRealizadaPageRoutingModule } from './compra-realizada-routing.module';

import { CompraRealizadaPage } from './compra-realizada.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CompraRealizadaPageRoutingModule
  ],
  declarations: [CompraRealizadaPage]
})
export class CompraRealizadaPageModule {}
