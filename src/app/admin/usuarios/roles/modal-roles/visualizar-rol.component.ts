import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-visualizar-rol',
  templateUrl: './visualizar-rol.component.html',
  styleUrls: ['./visualizar-rol.component.scss'],
})
export class VisualizarRolComponent implements OnInit {
  @Input() rol: any;

  constructor(private modalController: ModalController) { }

  ngOnInit() {}

  close() {
    this.modalController.dismiss();
  }
}