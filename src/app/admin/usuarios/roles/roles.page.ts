import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { IRol } from 'src/app/models/IRoles';
import { RolService } from '../../services/roles/rol.service';
import { LoadingController, AlertController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.page.html',
  styleUrls: ['./roles.page.scss'],
})
export class RolesPage implements OnInit {

  constructor(
    public restApi: RolService,
    public loadingController: LoadingController,
    public alertController: AlertController,
    public router: Router
  ) { }

  roles: IRol[] = [];

  ngOnInit() {
    this.getRoles();
  }

  async getRoles() {
    console.log("Prueba: getRoles");
    const loading = await this.loadingController.create({
      message: 'Cargando roles...'
    });
    // Muestra el Wait
    await loading.present();
    console.log("Prueba:");
    // Obtiene el Observable del servicio
    await this.restApi.getRoles()
      .subscribe({
        next: (data) => {
          console.log("Respuesta: ", data);
          // Si funciona asigno el resultado al arreglo roles
          this.roles = data;
          console.log("this.roles:", this.roles);
          loading.dismiss();
        }
        , complete: () => { }
        , error: (error_msg) => {
          // Si da error, imprimo en consola.
          console.log("Error:", error_msg);
          loading.dismiss();
        }
      });
  }

  async presentAlertConfirm(id: number, msg: string) {
    const alert = await this.alertController.create({
      header: 'Warning!', // Título
      message: msg,   // Mensaje
      buttons: [   // Botones
        {
          text: 'Eliminar : ' + id + " OK",
          handler: () => {
            this.deleteConfirmado(id);
          }
        }
      ]
    });

    // Muestra el Alert
    await alert.present();
  }
  async deleteRol(id: number) {
    // Confirma primero
    this.presentAlertConfirm(id, 'Estas seguro de eliminar el rol?');
  }

  // Invocado desde el alert
  async deleteConfirmado(id: number) {
    alert("Eliminando rol con id: " + id);
    const loading = await this.loadingController.create({
      message: 'Eliminando rol...'
    });
    await loading.present();
    // Llama al servicio para eliminar el rol
    await this.restApi.deleteRol(id)
      .subscribe({
        next: (data) => {
          console.log("Error DetailRol Page: ", data);
          // Si funciona asigno el resultado al arreglo roles
          loading.dismiss();
          this.router.navigate(['/admin/usuarios/roles']);
          //window.location.reload();
        }
        , complete: () => { }
        , error: (error_msg) => {
          // Si da error, imprimo en consola.
          console.log("Error brutal:", error_msg);
          loading.dismiss();
          alert("Error eliminando usuario: " + error_msg.message);

        }
      });
  }
}