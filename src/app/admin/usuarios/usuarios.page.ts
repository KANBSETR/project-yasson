import { Component, OnInit, OnDestroy } from '@angular/core';
import { ToastController, ModalController } from '@ionic/angular';
import { FirestoreServiceUsuarios } from '../services/usuarios/usuario.service';
import { FirestoreServiceRoles } from '../services/roles/rol.service';
import { LoadingController, AlertController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { VisualizarUsuarioComponent } from './modal-usuarios/visualizar-usuario.component';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.page.html',
  styleUrls: ['./usuarios.page.scss'],
})
export class UsuariosPage implements OnInit, OnDestroy {

  usuarios: any[] = [];
  readonly defaultUsuarios = ['Admin', 'admin', 'Usuario', 'usuario'];
  filteredUsuarios: any[] = [];
  searchTerm: string = '';
  roles: any = [];
  usuarioForm!: FormGroup;
  showAccordion = false;

  constructor(
    private formBuilder: FormBuilder,
    public restApi: FirestoreServiceUsuarios,
    private rolService: FirestoreServiceRoles,
    public loadingController: LoadingController,
    public alertController: AlertController,
    public toastController: ToastController,
    public router: Router,
    private modalController: ModalController
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
      rol: [null, Validators.required]
    });
    this.loadRoles();
    this.getUsuarios();
  }

  ngOnDestroy() {
    // Cerrar cualquier instancia abierta de SweetAlert al destruir el componente
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

  async getUsuarios() {
    const loading = await this.loadingController.create({
      message: 'Cargando usuarios...'
    });
    await loading.present();

    this.restApi.getUsuarios().subscribe({
      next: (data: any[]) => {
        this.usuarios = data.map((usuario: any) => {
          if (this.defaultUsuarios.includes(usuario.usuario)) {
            return { ...usuario, usuario: `${usuario.usuario} (Predeterminado)` };
          }
          return usuario;
        });
        this.filteredUsuarios = [...this.usuarios];
        loading.dismiss();
      },
      error: (error_msg: any) => {
        console.log("Error:", error_msg);
        loading.dismiss();
      }
    });
  }

  async deleteUsuario(id: string) {
    const usuario = this.usuarios.find(u => u.id === id);
    if (usuario) {
      if (this.defaultUsuarios.includes(usuario.usuario.replace(' (Predeterminado)', ''))) {
        const toast = await this.toastController.create({
          message: `El usuario "${usuario.usuario}" no se puede eliminar porque es un usuario predeterminado.`,
          duration: 3000,
          position: 'top'
        });
        toast.present();
      } else {
        const alert = await this.alertController.create({
          header: '¿Estás seguro?',
          message: `¿Deseas eliminar el usuario "${usuario.usuario}"?`,
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
    } else {
      console.error('Usuario no encontrado');
      const toast = await this.toastController.create({
        message: 'Usuario no encontrado.',
        duration: 3000,
        position: 'top'
      });
      toast.present();
    }
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

          // Actualizar la lista de usuarios después de eliminar
          this.getUsuarios();
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

  async editUsuario(id: string) {
    const usuario = this.usuarios.find(u => u.id === id);
    if (usuario) {
      if (this.defaultUsuarios.includes(usuario.usuario.replace(' (Predeterminado)', ''))) {
        const toast = await this.toastController.create({
          message: `El usuario "${usuario.usuario}" no se puede modificar porque es un usuario predeterminado.`,
          duration: 3000,
          position: 'top'
        });
        toast.present();
      } else {
        this.router.navigate(['/admin/usuarios/editar-usuario', id]);
      }
    } else {
      console.error('Usuario no encontrado');
      const toast = await this.toastController.create({
        message: 'Usuario no encontrado.',
        duration: 3000,
        position: 'top'
      });
      toast.present();
    }
  }

  async viewUsuario(id: any) {
    const loading = await this.loadingController.create({
      message: 'Cargando detalles del usuario...'
    });
    await loading.present();

    const idStr = String(id);

    this.restApi.getUsuario(idStr).subscribe({
      next: async (usuario) => {
        if (!usuario.permisosRoles) {
          usuario.permisosRoles = { puedeCrear: false, puedeEditar: false, puedeEliminar: false };
        }
        if (!usuario.permisosUsuarios) {
          usuario.permisosUsuarios = { puedeAgregar: false, puedeModificar: false, puedeEliminar: false };
        }
        if (!usuario.permisosPlantas) {
          usuario.permisosPlantas = { puedeAgregar: false, puedeModificar: false, puedeEliminar: false };
        }

        const modal = await this.modalController.create({
          component: VisualizarUsuarioComponent,
          componentProps: { usuario }
        });
        await modal.present();
        loading.dismiss();
      },
      error: (error) => {
        console.error('Error al cargar detalles del usuario', error);
        loading.dismiss();
      }
    });
  }

  filterUsuarios() {
    const searchTermLower = this.searchTerm.toLowerCase();
    this.filteredUsuarios = this.usuarios.filter(usuario =>
      usuario.usuario.toLowerCase().includes(searchTermLower)
    );
  }
}