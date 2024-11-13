import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RcontraPage } from './rcontra.page';

const routes: Routes = [
  {
    path: '',
    component: RcontraPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RcontraPageRoutingModule {}
