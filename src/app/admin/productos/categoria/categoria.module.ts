import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { CategoriaPageRoutingModule } from './categoria-routing.module';
import { CategoriaPage } from './categoria.page';
import { SharedModule } from 'src/app/shared/shared.module';
import { VisualizarCategoriaComponent } from './modal-categoria/visualizar-categoria.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CategoriaPageRoutingModule,
    SharedModule,
    RouterModule.forChild([{ path: '', component: CategoriaPage }])
  ],
  declarations: [CategoriaPage, VisualizarCategoriaComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class CategoriaPageModule {}
