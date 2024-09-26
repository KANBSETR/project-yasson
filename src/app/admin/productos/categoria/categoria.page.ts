import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { ICategoria } from 'src/app/models/ICategorias';
import { CategoriaService } from '../../services/categorias/categoria.service';
import { LoadingController, AlertController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.page.html',
  styleUrls: ['./categoria.page.scss'],
})
export class CategoriaPage implements OnInit {
  constructor(public restApi: CategoriaService
    , public loadingController: LoadingController
    , public alertController: AlertController
    , public router: Router) {
  }

  categorias: ICategoria[] = [];
  ngOnInit() {
    this.getCategoria();
  }

  async getCategoria() {
    console.log("Entrando :getCategoria");
    // Crea un Wait (Esperar)
    const loading = await this.loadingController.create({
      message: 'Cargando categorias...'
    });
    // Muestra el Wait
    await loading.present();
    console.log("Entrando :");
    // Obtiene el Observable del servicio
    await this.restApi.getCategorias()
      .subscribe({
        next: (res) => {
          console.log("Res:" + res);
          // Si funciona asigno el resultado al arreglo productos
          this.categorias = res;
          console.log("thisCategorias:", this.categorias);
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
    await this.restApi.deleteCategoria(id)
      .subscribe({
        next: (res) => {
          console.log("Error DetailProduct Página", res);
          loading.dismiss();
          this.router.navigate(['admin/productos/categoria']);
        }
        , complete: () => { }
        , error: (err) => {
          console.log("Error DetailProduct Página", err);
          loading.dismiss(); //Elimina la espera
        }

      })
  }
}
