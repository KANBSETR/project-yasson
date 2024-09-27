import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { LoadingController, AlertController } from '@ionic/angular';
import { ToastController, ModalController } from '@ionic/angular';
import Swal from 'sweetalert2';
import { IPlanta } from 'src/app/models/IPlantas';
import { ActivatedRoute, Router } from '@angular/router';
import { PlantaService } from '../../services/plantas/planta.service';
import { CategoriaService } from '../../services/categorias/categoria.service';
@Component({
  selector: 'app-agregar-planta',
  templateUrl: './agregar-planta.page.html',
  styleUrls: ['./agregar-planta.page.scss'],
})

export class AgregarPlantaPage implements OnInit {
  plantaForm!: FormGroup;
  planta: IPlanta = {
    id: Math.floor(Math.random() * 1000),
    nombrePlanta: '',
    nombreCientifico: '',
    categoria: 0,
    precio: 0,
    stock: 0,
    imagen: '',
    descripcion: ''
  };

  categorias: any = [];         
  constructor(private formBuilder: FormBuilder,
    public loadingController: LoadingController,
    private restApi: PlantaService,
    private restApiC: CategoriaService,
    private router: Router,
    ) { 
    }
    
  ngOnInit() {
    this.getCategory();
    // Especificamos que todos los campos son obligatorios
    this.plantaForm = this.formBuilder.group({
      "plant_name" : [null, Validators.required],
      'plant_scientific_name' : [Validators, Validators.required],
      'plant_category' : [null, Validators.required],
      'plant_price' : [null, Validators.required],
      'plant_stock' : [null, Validators.required],
      'plant_img' : [null, Validators.required],
      'plant_desc' : [null, Validators.required],
    });
  }
  async onFormSubmit(form:NgForm) {  
    // Creamos un Loading Controller, Ojo no lo muestra
    const loading = await this.loadingController.create({
      message: 'Loading...'
    });
    
    // Ejecuta el método del servicio y los suscribe
    await this.restApi.addPlanta(this.planta)
      .subscribe({
        next: (res) => {
          console.log("Next AddProduct Page",res)
          loading.dismiss(); //Elimina la espera
          if (res== null){ // No viene respuesta del registro
            console.log("Next No Agrego, Ress Null ");
            return
          }
          // Si viene respuesta
          console.log("Next Agrego SIIIIII Router saltaré ;",this.router);
          this.router.navigate(['/admin/productos']);
          //window.location.reload();
        }
        , complete: () => { }
        , error: (err) => {
          console.log("Error AddProduct Página",err);
          loading.dismiss(); //Elimina la espera
        }
      });
    console.log("Observe que todo lo del suscribe sale después de este mensaje")
  }

  async getCategory() {
    console.log("Entrando :getCategory");
    // Crea un Wait (Esperar)
    const loading = await this.loadingController.create({
      message: 'Cargando Categorias...'
    });
    // Muestra el Wait
    await loading.present();
    console.log("Entrando :");
    // Obtiene el Observable del servicio
    await this.restApiC.getCategorias()
      .subscribe({
        next: (res) => { 
          console.log("Res:" + res);
          this.categorias = res;
          console.log("thisCategoria:",this.categorias);
          loading.dismiss();
          
        }
        , complete: () => { }
        , error: (err) => {
          console.log("Err:" + err);
          loading.dismiss();
        }
      })
  }
}