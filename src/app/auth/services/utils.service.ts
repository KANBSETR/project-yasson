import { inject, Injectable } from '@angular/core';
import { LoadingController, ToastController, ToastOptions } from '@ionic/angular';
@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  loadingCrl = inject(LoadingController);
  toastCtrl = inject(ToastController);

  loading() {
    return this.loadingCrl.create({
      message: 'Cargando...',
      spinner: 'crescent'
    }
    );
  }

  async presentToast(opts?: ToastOptions) {
    const toast = await this.toastCtrl.create(opts);
    toast.present();
  }
}