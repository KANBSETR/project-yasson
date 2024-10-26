import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomeUsuarioPageRoutingModule } from './home-usuario-routing.module';

import { HomeUsuarioPage } from './home-usuario.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomeUsuarioPageRoutingModule
  ],
  declarations: [HomeUsuarioPage]
})
export class HomeUsuarioPageModule {}
