import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-visualizar-usuario',
  templateUrl: './visualizar-usuario.component.html',
  styleUrls: ['./visualizar-usuario.component.scss'],
})
export class VisualizarUsuarioComponent {
  @Input() usuario: any;

  constructor(private modalController: ModalController) { }

  close() {
    this.modalController.dismiss();
  }
}