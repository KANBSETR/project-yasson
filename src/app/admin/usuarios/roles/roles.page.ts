import { Component, OnInit, OnDestroy } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { FirestoreService } from '../../services/roles/rol.service';
import { LoadingController, AlertController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.page.html',
  styleUrls: ['./roles.page.scss'],
})
export class RolesPage implements OnInit, OnDestroy {

  roles: any[] = [];
  readonly defaultRoles = ['Admin', 'admin', 'Usuario', 'usuario']; // Roles predeterminados

  constructor(
    public restApi: FirestoreService,
    public loadingController: LoadingController,
    public alertController: AlertController,
    public toastController: ToastController,
    public router: Router
  ) { }

  ngOnInit() {
    this.getRoles();
  }

  ngOnDestroy() {
    // Cerrar cualquier instancia abierta de SweetAlert al destruir el componente
  }

  async getRoles() {
    console.log("Prueba: getRoles");
    const loading = await this.loadingController.create({
      message: 'Cargando roles...'
    });
    // Muestra el Wait
    await loading.present();
    // Obtiene el Observable del servicio
    this.restApi.getRoles()
      .subscribe({
        next: (data) => {
          console.log("Respuesta: ", data);
          // Si funciona asigno el resultado al arreglo roles
          this.roles = data.map(role => {
            if (this.defaultRoles.includes(role.nombre)) {
              return { ...role, nombre: `${role.nombre} (Predeterminado)` };
            }
            return role;
          });
          console.log("this.roles:", this.roles);
          loading.dismiss();
        },
        complete: () => { },
        error: (error_msg) => {
          // Si da error, imprimo en consola.
          console.log("Error:", error_msg);
          loading.dismiss();
        }
      });
  }

  async deleteRol(id: string) {
    const rol = this.roles.find(r => r.id === id);
    if (rol && this.defaultRoles.includes(rol.nombre.replace(' (Predeterminado)', ''))) {
      // Si el rol es predeterminado, mostrar advertencia y no permitir eliminación
      const toast = await this.toastController.create({
        message: `El rol "${rol.nombre}" no se puede eliminar porque es un rol predeterminado.`,
        duration: 3000,
        position: 'top'
      });
      toast.present();
    } else {
      // Usar AlertController para confirmar la eliminación(Despues tratar de cambiar por sweetalert2)
      const alert = await this.alertController.create({
        header: '¿Estás seguro?',
        message: `¿Deseas eliminar el rol "${rol.nombre}"?`,
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
  }

  async deleteConfirmado(id: string) {
    const loading = await this.loadingController.create({
      message: 'Eliminando rol...'
    });
    await loading.present();
    // Llama al servicio para eliminar el rol
    this.restApi.deleteRol(id)
      .subscribe({
        next: async (data) => {
          console.log("Rol eliminado: ", data);
          loading.dismiss();

          // Toast de éxito
          const toastSuccess = await this.toastController.create({
            message: 'Rol eliminado exitosamente.',
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

          // Navegar a la página de roles(No funcionaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa)
          this.router.navigate(['/admin/usuarios/roles']);
        },
        complete: () => { },
        error: async (error_msg) => {
          console.log("Error eliminando rol:", error_msg);
          loading.dismiss();

          // Toast de error
          const toastError = await this.toastController.create({
            message: `Error eliminando rol: ${error_msg.message}`,
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