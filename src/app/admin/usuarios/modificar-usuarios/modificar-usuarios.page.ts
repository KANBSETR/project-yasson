import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { LoadingController, AlertController, ToastController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { FirestoreServiceUsuarios } from '../../services/usuarios/usuario.service';
import { FirestoreServiceRoles } from '../../services/roles/rol.service'; // Importar el servicio de roles

@Component({
  selector: 'app-modificar-usuarios',
  templateUrl: './modificar-usuarios.page.html',
  styleUrls: ['./modificar-usuarios.page.scss'],
})
export class ModificarUsuarioPage implements OnInit {
  usuarioForm!: FormGroup;
  usuario: any = {
    id: '',
    usuario: '',
    correo: '',
    nombres: '',
    apellidos: '',
    numeroDeCelular: '',
    edad: '',
    rol: ''
  };
  roles: any[] = []; // Definir la propiedad roles

  constructor(
    private formBuilder: FormBuilder,
    public loadingController: LoadingController,
    private restApi: FirestoreServiceUsuarios,
    private rolService: FirestoreServiceRoles, // Inyectar el servicio de roles
    private router: Router,
    public toastController: ToastController,
    private route: ActivatedRoute,
    public alertController: AlertController // Añadir AlertController para confirmación de eliminación
  ) { }

  ngOnInit() {
    this.usuarioForm = this.formBuilder.group({
      usuario: [null, [Validators.required, this.noSpecialCharsValidator]],
      correo: [null, [Validators.required, Validators.email, this.emailValidator]],
      nombres: [null, this.noSpecialCharsValidator],
      apellidos: [null, this.noSpecialCharsValidator],
      numeroDeCelular: [null],
      edad: [null, this.noSpecialCharsValidator],
      rol: [null, Validators.required] // Campo para el rol
    });

    this.usuarioForm.get('usuario')?.valueChanges.subscribe(value => {
      this.checkFieldErrors('usuario');
    });

    this.usuarioForm.get('correo')?.valueChanges.subscribe(value => {
      this.checkFieldErrors('correo');
    });

    this.loadUsuarioData();
    this.loadRoles(); // Cargar los roles al inicializar el componente
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
      duration: 3000,
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

  async loadUsuarioData() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      const loading = await this.loadingController.create({
        message: 'Cargando usuario...'
      });
      await loading.present();

      this.restApi.getUsuario(id).subscribe({
        next: (data: any) => {
          if (data) {
            this.usuario = data;
            this.usuario.id = id;
            this.usuarioForm.patchValue({
              usuario: this.usuario.usuario,
              correo: this.usuario.correo,
              nombres: this.usuario.nombres,
              apellidos: this.usuario.apellidos,
              numeroDeCelular: this.usuario.numeroDeCelular,
              edad: this.usuario.edad,
              rol: this.usuario.rol
            });
          } else {
            console.error('Usuario no encontrado');
            this.presentToast('Usuario no encontrado.', 'danger');
          }
          loading.dismiss();
        },
        error: (error_msg: any) => {
          console.log("Error cargando usuario", error_msg);
          loading.dismiss();
          this.presentToast('Error cargando usuario.', 'danger');
        }
      });
    }
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

  async onFormSubmit() {
    if (this.usuarioForm.invalid) {
      this.checkFieldErrors('usuario');
      this.checkFieldErrors('correo');
      this.checkFieldErrors('nombres');
      this.checkFieldErrors('apellidos');
      this.checkFieldErrors('edad');
      this.checkFieldErrors('rol');
      return;
    }

    const loading = await this.loadingController.create({
      message: 'Guardando...'
    });
    await loading.present();

    this.usuario = { ...this.usuario, ...this.usuarioForm.value }; // Actualiza el objeto usuario con los valores del formulario

    this.restApi.updateUsuario(this.usuario.id, this.usuario)
      .then(async () => {
        console.log("Next updateUsuario Page");
        loading.dismiss();
        console.log("Next actualizo, Data Not Null, actualizando lista de usuarios");

        // Navegar a la página de usuarios
        this.router.navigateByUrl('/admin/usuarios');

        // Mostrar mensaje de confirmación
        this.presentToast('Usuario actualizado correctamente.', 'success');
      })
      .catch(async (error_msg: any) => {
        console.log("Error updateUsuario Page", error_msg);
        loading.dismiss();
        // Mostrar mensaje de error
        this.presentToast('Error al actualizar el usuario.', 'danger');

        // Redirigir a la página de usuarios incluso si hay un error
        this.router.navigateByUrl('/admin/usuarios'); // Navegar a la página de usuarios
      });

    console.log("Fin de la ejecución del método onFormSubmit");
  }

  async deleteUsuario(id: string) {
    const alert = await this.alertController.create({
      header: '¿Estás seguro?',
      message: `¿Deseas eliminar el usuario "${this.usuario.usuario}"?`,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Sí, eliminar',
          handler: () => {
            this.deleteConfirmado(id);
          }
        }
      ]
    });

    await alert.present();
  }

  async deleteConfirmado(id: string) {
    const loading = await this.loadingController.create({
      message: 'Eliminando usuario...'
    });
    await loading.present();

    this.restApi.deleteUsuario(id)
      .subscribe({
        next: async () => {
          console.log("Usuario eliminado");
          loading.dismiss();

          const toastSuccess = await this.toastController.create({
            message: 'Usuario eliminado exitosamente.',
            duration: 3000,
            position: 'top',
            color: 'success',
            buttons: [
              {
                side: 'end',
                icon: 'checkmark-circle-outline',
                handler: () => {
                  console.log('Toast de éxito cerrado');
                }
              }
            ]
          });
          toastSuccess.present();

          // Navegar a la página de usuarios
          this.router.navigateByUrl('/admin/usuarios');
        },
        complete: () => { },
        error: async (error_msg) => {
          console.log("Error eliminando usuario:", error_msg);
          loading.dismiss();

          const toastError = await this.toastController.create({
            message: `Error eliminando usuario: ${error_msg.message}`,
            duration: 3000,
            position: 'top',
            color: 'danger',
            buttons: [
              {
                side: 'end',
                icon: 'alert-circle-outline',
                handler: () => {
                  console.log('Toast de error cerrado');
                }
              }
            ]
          });
          toastError.present();
        }
      });
  }
}