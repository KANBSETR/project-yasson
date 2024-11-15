import { Component, OnInit, inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { IUsuario } from 'src/app/models/IUsuarios';
import { FirestoreService } from 'src/app/services-firebase/firestore.service';
import { UtilsService } from 'src/app/auth/services/utils.service';

@Component({
  selector: 'app-rcontra',
  templateUrl: './rcontra.page.html',
  styleUrls: ['./rcontra.page.scss'],
})
export class RcontraPage implements OnInit {
  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
  });

  firebaseSvc = inject(FirestoreService);
  utilsSvc = inject(UtilsService);

  constructor(
    public toastController: ToastController,
  ) {
    // Suscribirse a los cambios en el campo de email
    this.form.controls['email'].valueChanges.subscribe(() => {
      this.checkEmailErrors();
    });
  }

  ngOnInit() {
    console.log("hola");
  }

  async checkEmailErrors() {
    const emailControl = this.form.controls['email'];
    let errorMessage = '';

    if (emailControl.hasError('required')) {
      errorMessage = 'El campo de correo electrónico es requerido.';
    } else if (emailControl.hasError('email')) {
      errorMessage = 'Por favor, ingresa un correo electrónico válido.';
    }

    // Mostrar el mensaje de error en forma de toast si existe
    if (errorMessage) {
      await this.showToast(errorMessage);
    }
  }


  async showToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 500,
      position: 'top',
      color: 'danger',
    });

    await toast.present();
  }


  async recuperarContra() {
    if (this.form.valid) {
      const loading = await this.utilsSvc.loading();
      await loading.present();

      const email = this.form.value.email || '';
      this.firebaseSvc.recuperarContra(email).then(res => {
        console.log(res);
      }).catch(err => {
        console.log(err);

        this.utilsSvc.presentToast({
          message: 'Correo o contraseña incorrectos',
          duration: 2000,
          color: 'danger',
          position: 'top'
        });
      }).finally(() => {
        loading.dismiss();
      });
    }
  }

}
