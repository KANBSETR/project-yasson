import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { IPlanta } from 'src/app/models/IPlantas';
import { PlantaService } from '../services/plantas/planta.service';
import { LoadingController, AlertController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.page.html',
  styleUrls: ['./productos.page.scss'],
})
export class ProductosPage implements OnInit {
  constructor(public restApi: PlantaService
    , public loadingController: LoadingController
    , public alertController: AlertController
    , public router: Router) {
  }

  plantas: IPlanta[] = [];
  ngOnInit() {
    this.getPlanta();
  }

  async getPlanta() {
    console.log("Entrando :getPlanta");
    // Crea un Wait (Esperar)
    const loading = await this.loadingController.create({
      message: 'Cargando plantas...'
    });
    // Muestra el Wait
    await loading.present();
    console.log("Entrando :");
    // Obtiene el Observable del servicio
    await this.restApi.getPlantas()
      .subscribe({
        next: (res) => {
          console.log("Res:" + res);
          // Si funciona asigno el resultado al arreglo productos
          this.plantas = res;
          console.log("thisPlantas:", this.plantas);
          loading.dismiss();
        }
        , complete: () => { }
        , error: (err) => {
          // Si da error, imprimo en consola.
          console.log("Err:" + err);
          loading.dismiss();
        }
      })
  }

  async presentAlertConfirm(id: number, msg: string) {
    const alert = await this.alertController.create({
      header: 'Warning!', // Título
      message: msg,   // Mensaje
      buttons: [   // Botones
        {
          text: 'Eliminar : ' + id + " OK",
          handler: () => { // Si presiona ejecuta esto
            //this.router.navigate(['']);
            this.deleteConfirmado(id)
          }
        }
      ]
    });
    // Presenta en pantalla
    await alert.present();
  }
  async delete(id: number) {
    // Confirma Primero
    this.presentAlertConfirm(id, 'Confirme la Eliminación, De lo cantrario Cancele');
  }

    // Es invocado desde el Alert
    async deleteConfirmado(id: number) {
      alert("Eliminando " + id)
      const loading = await this.loadingController.create({
        message: 'Loading...'
      });
      await loading.present();
      // LLama al método del servicio
      await this.restApi.deletePlanta(id)
        .subscribe({
          next: (res) => {
            console.log("Error DetailProduct Página", res);
            loading.dismiss();
            this.router.navigate(['admin/productos']);
          }
          , complete: () => { }
          , error: (err) => {
            console.log("Error DetailProduct Página", err);
            loading.dismiss(); //Elimina la espera
          }
  
        })
    }
}
