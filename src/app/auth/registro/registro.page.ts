import { Component, inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { IUsuario } from 'src/app/models/IUsuarios';
import { FirestoreService } from 'src/app/services-firebase/firestore.service';
import { UtilsService } from 'src/app/auth/services/utils.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage {

  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    confirmPassword: new FormControl('', [Validators.required, Validators.minLength(6)]),
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
    const confirmPasswordControl = this.form.controls['confirmPassword'];
    let errorMessage = '';

    if (passwordControl.hasError('required')) {
      errorMessage = 'El campo de contraseña es requerido.';
    } else if (passwordControl.hasError('minlength')) {
      errorMessage = 'La contraseña debe tener al menos 6 caracteres.';
    }
    //Ver si ambas contraseñas coinciden
    if (passwordControl.value !== confirmPasswordControl.value) {
      errorMessage = 'Las contraseñas no coinciden.';
    }

    // Mostrar el mensaje de error en forma de toast si existe
    if (errorMessage) {
      await this.showToast(errorMessage);
    }
  }

  async checkNameErrors() {
    const nameControl = this.form.controls['name'];
    let errorMessage = '';
  
    if (nameControl.hasError('required')) {
      errorMessage = 'El nombre es requerido';
    } else if (nameControl.hasError('minlength')) {
      errorMessage = 'El nombre debe tener al menos 3 caracteres';
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
  

  async registro(){
    if(this.form.valid){
      const loading = await this.utilsSvc.loading();
      await loading.present();
      this.firebaseSvc.register(this.form.value as IUsuario).then( async res => {
        if (this.form.value.name) {
          await this.firebaseSvc.updateName(this.form.value.name);
        }
        this.utilsSvc.presentToast({
          message: 'Usuario creado correctamente',
          duration: 2000,
          color: 'success',
          position: 'top'
        });
        window.location.href = '/login';
        console.log(res);
      }).catch(err => {
        console.log(err);
        
        this.utilsSvc.presentToast({
          message: 'El usuario ya existe',
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