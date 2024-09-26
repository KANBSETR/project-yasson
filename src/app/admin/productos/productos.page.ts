import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { IPlanta } from 'src/app/models/IPlantas';
import { PlantaService } from '../services/plantas/planta.service';
import { LoadingController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.page.html',
  styleUrls: ['./productos.page.scss'],
})
export class ProductosPage implements OnInit {
  constructor(public restApi: PlantaService
    , public loadingController: LoadingController
    , public router: Router){
  }

  plantas: IPlanta[] = [];
 ngOnInit(){
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
  await this.restApi.getPlanta()
    .subscribe({
      next: (res) => { 
        console.log("Res:" + res);
// Si funciona asigno el resultado al arreglo productos
        this.plantas = res;
        console.log("thisPlantas:",this.plantas);
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

}
