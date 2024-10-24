import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-visualizar-planta',
  templateUrl: './visualizar-planta.component.html',
  styleUrls: ['./visualizar-planta.component.scss'],
})
export class VisualizarPlantaComponent implements OnInit {
  @Input() planta: any = {}; // Inicializar planta como un objeto vacío
  static isOpen = false; // Flag estático para controlar la apertura del modal

  constructor(private modalController: ModalController) {}

  ngOnInit() {
    if (VisualizarPlantaComponent.isOpen) {
      this.close();
    } else {
        VisualizarPlantaComponent.isOpen = true;
    }
  }

  close() {
    VisualizarPlantaComponent.isOpen = false;
    this.modalController.dismiss();
  }
}