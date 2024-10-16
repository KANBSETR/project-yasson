import { Component, OnInit, OnDestroy } from '@angular/core';
import { ToastController, ModalController } from '@ionic/angular';
import { FirestoreServiceUsuarios } from '../services/usuarios/usuario.service';
import { LoadingController, AlertController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { VisualizarUsuarioComponent } from './modal-usuarios/visualizar-usuario.component';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.page.html',
  styleUrls: ['./usuarios.page.scss'],
})
export class UsuariosPage implements OnInit, OnDestroy {

  usuarios: any[] = [];
  readonly defaultUsuarios = ['Admin', 'admin', 'Usuario', 'usuario']; // Usuarios predeterminados
  filteredUsuarios: any[] = [];
  searchTerm: string = '';

  constructor(
    public restApi: FirestoreServiceUsuarios,
    public loadingController: LoadingController,
    public alertController: AlertController,
    public toastController: ToastController,
    public router: Router,
    private modalController: ModalController
  ) { }

  ngOnInit() {
    this.getUsuarios();
  }

  ngOnDestroy() {
    // Cerrar cualquier instancia abierta de SweetAlert al destruir el componente
  }

  async getUsuarios() {
    console.log("Prueba: getUsuarios");
    const loading = await this.loadingController.create({
      message: 'Cargando usuarios...'
    });
    await loading.present();

    this.restApi.getUsuarios().subscribe({
      next: (data: any[]) => {
        console.log("Respuesta: ", data);
        this.usuarios = data.map((usuario: any) => {
          if (this.defaultUsuarios.includes(usuario.usuario)) {
            return { ...usuario, usuario: `${usuario.usuario} (Predeterminado)` };
          }
          return usuario;
        });
        this.filteredUsuarios = [...this.usuarios]; // Inicializa los usuarios filtrados
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
        // Si el usuario es predeterminado, mostrar advertencia y no permitir eliminación
        const toast = await this.toastController.create({
          message: `El usuario "${usuario.usuario}" no se puede eliminar porque es un usuario predeterminado.`,
          duration: 3000,
          position: 'top'
        });
        toast.present();
      } else {
        // Usar AlertController para confirmar la eliminación
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
    // Llama al servicio para eliminar el usuario
    this.restApi.deleteUsuario(id)
      .subscribe({
        next: async (data) => {
          console.log("Usuario eliminado: ", data);
          loading.dismiss();

          // Toast de éxito
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
          this.router.navigate(['/admin/usuarios']);
        },
        complete: () => { },
        error: async (error_msg) => {
          console.log("Error eliminando usuario:", error_msg);
          loading.dismiss();

          // Toast de error
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
        // Si el usuario es predeterminado, mostrar advertencia y no permitir modificación
        const toast = await this.toastController.create({
          message: `El usuario "${usuario.usuario}" no se puede modificar porque es un usuario predeterminado.`,
          duration: 3000,
          position: 'top'
        });
        toast.present();
      } else {
        // Navegar a la página de edición del usuario
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

    // Convierte el ID a una cadena
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