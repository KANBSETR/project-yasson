import { Component, inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { IUsuario } from 'src/app/models/IUsuarios';
import { FirestoreService } from 'src/app/services-firebase/firestore.service';
import { UtilsService } from 'src/app/auth/services/utils.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
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

    // Suscribirse a los cambios en el campo de password
    this.form.controls['password'].valueChanges.subscribe(() => {
      this.checkPasswordErrors();
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

  async checkPasswordErrors() {
    const passwordControl = this.form.controls['password'];
    let errorMessage = '';

    if (passwordControl.hasError('required')) {
      errorMessage = 'El campo de contraseña es requerido.';
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
  

  async login(){
    if(this.form.valid){
      const loading = await this.utilsSvc.loading();
      await loading.present();

      this.firebaseSvc.login(this.form.value as IUsuario).then(res => {
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
