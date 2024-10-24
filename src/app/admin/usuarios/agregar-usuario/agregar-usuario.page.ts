import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { LoadingController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { FirestoreServiceUsuarios } from '../../services/usuarios/usuario.service';
import { FirestoreServiceRoles } from '../../services/roles/rol.service';

@Component({
  selector: 'app-agregar-usuario',
  templateUrl: './agregar-usuario.page.html',
  styleUrls: ['./agregar-usuario.page.scss'],
})
export class AgregarUsuarioPage implements OnInit {
  usuarioForm!: FormGroup;
  showAccordion = false;
  usuarios: any = [];
  roles: any = []; // Variable para almacenar los roles

  constructor(
    private formBuilder: FormBuilder,
    public loadingController: LoadingController,
    private restApiUsuario: FirestoreServiceUsuarios, // Inyectar FirestoreServiceUsuario
    private rolService: FirestoreServiceRoles, // Inyectar RolService
    private router: Router,
    public toastController: ToastController
  ) { }

  ngOnInit() {
    this.usuarioForm = this.formBuilder.group({
      usuario: [null, [Validators.required, this.noSpecialCharsValidator]],
      correo: [null, [Validators.required, Validators.email, this.emailValidator]],
      contrasena: [null, Validators.required],
      nombres: [null, this.noSpecialCharsValidator],
      apellidos: [null, this.noSpecialCharsValidator],
      numeroDeCelular: [null],
      edad: [null, this.noSpecialCharsValidator],
      rol: [null, Validators.required] // Campo para el rol
    });

    this.usuarioForm.get('usuario')?.valueChanges.subscribe((value) => {
      this.checkFieldErrors('usuario');
    });

    this.usuarioForm.get('correo')?.valueChanges.subscribe((value) => {
      this.checkFieldErrors('correo');
    });

    this.usuarioForm.get('contrasena')?.valueChanges.subscribe((value) => {
      this.checkFieldErrors('contrasena');
    });

    this.usuarioForm.get('nombres')?.valueChanges.subscribe((value) => {
      this.checkFieldErrors('nombres');
    });

    this.usuarioForm.get('apellidos')?.valueChanges.subscribe((value) => {
      this.checkFieldErrors('apellidos');
    });

    this.usuarioForm.get('edad')?.valueChanges.subscribe((value) => {
      this.checkFieldErrors('edad');
    });

    this.loadRoles();
  }

  toggleAccordion() {
    this.showAccordion = !this.showAccordion;
  }

  async loadRoles() {
    const loading = await this.loadingController.create({
      message: 'Cargando roles...'
    });
    await loading.present();

    this.rolService.getRoles().subscribe({
      next: (data: any[]) => {
        this.roles = data;
        loading.dismiss();
      },
      error: (error_msg: any) => {
        console.log("Error cargando roles", error_msg);
        loading.dismiss();
      }
    });
  }

  noSpecialCharsValidator(control: FormControl) {
    const forbiddenChars = /[#$%&!"°|/()='?¿¡´+{}¨*;,><]/;
    const hasForbiddenChars = forbiddenChars.test(control.value);
    return hasForbiddenChars ? { 'forbiddenChars': { value: control.value } } : null;
  }

  emailValidator(control: FormControl) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValidEmail = emailPattern.test(control.value);
    return isValidEmail ? null : { 'invalidEmail': { value: control.value } };
  }

  async presentToast(message: string, color: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 800,
      position: 'top',
      color: color
    });
    toast.present();
  }

  checkFieldErrors(field: string) {
    const control = this.usuarioForm.get(field);
    if (control?.hasError('forbiddenChars')) {
      this.presentToast(`El ${field} no debe contener caracteres especiales como #$%&!"°|/()='?¿¡´+{}¨*;,><.`, 'danger');
    }
    if (field === 'correo' && control?.hasError('invalidEmail')) {
      this.presentToast('Por favor, introduce un correo válido.', 'danger');
    }
  }

  async onFormSubmit() {
    if (this.usuarioForm.invalid) {
      this.checkFieldErrors('usuario');
      this.checkFieldErrors('correo');
      this.checkFieldErrors('contrasena');
      this.checkFieldErrors('nombres');
      this.checkFieldErrors('apellidos');
      this.checkFieldErrors('edad');
      this.checkFieldErrors('rol');
      return;
    }

    const loading = await this.loadingController.create({
      message: 'Agregando usuario...'
    });
    await loading.present();

    this.usuarios = this.usuarioForm.value; // Actualiza el objeto usuario con los valores del formulario

    this.restApiUsuario.addUsuario(this.usuarios)
      .subscribe({
        next: async () => {
          console.log("Next addUsuario Page");
          loading.dismiss();
          console.log("Next agrego, Data Not Null, actualizando lista de usuarios");
          await this.getUsuarios();

          // Navegar a la página de usuarios
          this.router.navigateByUrl('/admin/usuarios');

          // Mostrar mensaje de confirmación
          this.presentToast('Usuario agregado correctamente.', 'success');
        },
        error: async (error_msg: any) => {
          console.log("Error addUsuario Page", error_msg);
          loading.dismiss();
          // Mostrar mensaje de error
          this.presentToast('Error al agregar el usuario.', 'danger');

          // Redirigir a la página de usuarios incluso si hay un error
          this.router.navigateByUrl('/admin/usuarios'); // Navegar a la página de usuarios
        }
      });
    console.log("Fin de la ejecución del método onFormSubmit");
  }

  async getUsuarios() {
    console.log("Prueba: getUsuarios");
    const loading = await this.loadingController.create({
      message: 'Cargandooooo...'
    });
    await loading.present();
    this.restApiUsuario.getUsuarios()
      .subscribe({
        next: (data: any) => {
          this.usuarios = data;
          console.log("Usuarios", this.usuarios);
          loading.dismiss();
        },
        complete: () => { },
        error: (error_msg: any) => {
          console.log("Error getUsuarios Page", error_msg);
          loading.dismiss();
        }
      });
  }
}