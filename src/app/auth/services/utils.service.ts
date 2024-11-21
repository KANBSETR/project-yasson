import { inject, Injectable } from '@angular/core';
import { LoadingController, ToastController, ToastOptions } from '@ionic/angular';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { camera } from 'ionicons/icons';
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


  async tomarFoto(promptLabelHeader: string) {
    return await Camera.getPhoto({
      quality: 90,
      allowEditing: true,
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Prompt,
      promptLabelHeader,
      promptLabelPhoto: 'Selecciona una imagen',
      promptLabelPicture: 'Tomar foto',
    });
  };

}