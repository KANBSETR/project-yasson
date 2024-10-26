import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ArduinoPage } from './arduino.page';

const routes: Routes = [
  {
    path: '',
    component: ArduinoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ArduinoPageRoutingModule {}
