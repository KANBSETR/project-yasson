import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { IUsuario } from 'src/app/models/IUsuarios';
import { UsuarioService } from '../services/usuarios/usuario.service';
import { LoadingController, AlertController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.page.html',
  styleUrls: ['./usuarios.page.scss'],
})
export class UsuariosPage implements OnInit {
  constructor(
    public restApi: UsuarioService,
    public loadingController: LoadingController,
    public alertController: AlertController,
    public router: Router
  ) { }

  usuarios: IUsuario[] = [];

  ngOnInit() {
    this.getUsuarios();
  }

  async getUsuarios() {
    console.log("Prueba: getUsuario");
    const loading = await this.loadingController.create({
      message: 'Cargando usuarios...'
    });
    // Muestra el Wait
    await loading.present();
    console.log("Prueba:");
    // Obtiene el Observable del servicio
    await this.restApi.getUsuarios()
      .subscribe({
        next: (data) => {
          console.log("Respuesta: ", data);
          // Si funciona asigno el resultado al arreglo usuarios
          this.usuarios = data;
          console.log("this.usuarios:", this.usuarios);
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
          handler: () => { // Si presiona ejecuta esto
            this.deleteConfirmado(id);
          }
        }
      ]
    });
    // Muestra el Alert
    await alert.present();
  }
  async deleteUsuario(id: number) {
    // Confirma primero
    this.presentAlertConfirm(id, '¿Estás seguro de que deseas eliminar el usuario?');
  }

  //Invocado desde el alert
  async deleteConfirmado(id: number) {
    alert("Eliminando usuario con id: " + id);
    const loading = await this.loadingController.create({
      message: 'Eliminando usuario...'
    });
    await loading.present();
    //Llama al metodo del servicio para eliminar el usuario
    await this.restApi.deleteUsuario(id)
      .subscribe({
        next: (data) => {
          console.log("Error DetailUsuario Page: ", data);
          // Si funciona asigno el resultado al arreglo usuarios
          loading.dismiss();
          this.router.navigate(['admin/usuarios']);
          window.location.reload(); // Recarga la página

        }
        , complete: () => { }
        , error: (error_msg) => {
          // Si da error, imprimo en consola.
          console.log("Error brutal:", error_msg);
          loading.dismiss();
          alert("Error eliminando usuario: " + error_msg.message);

        }
      })
  }
}