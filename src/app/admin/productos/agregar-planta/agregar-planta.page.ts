import { Component } from '@angular/core';
import { ToastController, ModalController } from '@ionic/angular';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-agregar-planta',
  templateUrl: './agregar-planta.page.html',
  styleUrls: ['./agregar-planta.page.scss'],
})
export class AgregarPlantaPage {

  constructor(
    private toastController: ToastController,
    private modalController: ModalController
  ) { }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Planta agregada correctamente',
      duration: 2000,
      position: 'top',
    });
    await toast.present();
  }

  async presentAlert() {
    Swal.fire({
      title: 'Planta agregada correctamente',
      icon: 'success',
      timer: 2000,
      position: 'top',
      showConfirmButton: false,
      toast: true
    });
  }

}