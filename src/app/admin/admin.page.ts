import { Component } from '@angular/core';
import { addIcons } from 'ionicons';
import { chevronForward, listCircle } from 'ionicons/icons';
@Component({
  selector: 'app-admin',
  templateUrl: 'admin.page.html',
  styleUrls: ['admin.page.scss'],
})
export class HomePage {
  username= 'admin'; //Cambiar con el usuario logueado
  constructor() {
    addIcons({ chevronForward, listCircle });
  }

}
