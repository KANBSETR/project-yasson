import { Component} from '@angular/core';
import { ToastController } from '@ionic/angular';
@Component({
  selector: 'app-agregar-planta',
  templateUrl: './agregar-planta.page.html',
  styleUrls: ['./agregar-planta.page.scss'],
})
export class AgregarPlantaPage {

  constructor(private toastController: ToastController) { }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Planta agregada correctamente',
      duration: 2000,
      position: 'top',
    });
    await toast.present();
  }

}
