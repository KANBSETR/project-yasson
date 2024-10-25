import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-visualizar-categoria',
  templateUrl: './visualizar-categoria.component.html',
  styleUrls: ['./visualizar-categoria.component.scss'],
})
export class VisualizarCategoriaComponent implements OnInit {
  @Input() categoria: any = {}; // Inicializar categoria como un objeto vacío
  static isOpen = false; // Flag estático para controlar la apertura del modal

  constructor(private modalController: ModalController) {}

  ngOnInit() {
    if (VisualizarCategoriaComponent.isOpen) {
      this.close();
    } else {
      VisualizarCategoriaComponent.isOpen = true;
    }
  }

  close() {
    VisualizarCategoriaComponent.isOpen = false;
    this.modalController.dismiss();
  }
}