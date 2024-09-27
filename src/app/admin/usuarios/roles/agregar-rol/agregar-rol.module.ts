import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; 
import { IonicModule } from '@ionic/angular';
import { AgregarRolPageRoutingModule } from './agregar-rol-routing.module';
import { AgregarRolPage } from './agregar-rol.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule, 
    IonicModule,
    AgregarRolPageRoutingModule
  ],
  declarations: [AgregarRolPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AgregarRolPageModule {}