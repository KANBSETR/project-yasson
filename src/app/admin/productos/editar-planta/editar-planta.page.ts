import { Component, OnInit } from '@angular/core';
// Imporamos librerías
import { LoadingController, AlertController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';

import { FirestoreServicePlantas } from '../../services/plantas/planta.service'; // Importar el servicio de Firestore
import { FirestoreServiceCategoria } from '../../services/categorias/categoria.service'; // Importar el servicio de Firestore

@Component({
  selector: 'app-editar-planta',
  templateUrl: './editar-planta.page.html',
  styleUrls: ['./editar-planta.page.scss'],
})
export class EditarPlantaPage implements OnInit {

  constructor(public restApi: FirestoreServicePlantas, // Usar el servicio de Firestore
    public loadingController: LoadingController,
    public alertController: AlertController,
    public route: ActivatedRoute,
    private restApiC: FirestoreServiceCategoria, // Usar el servicio de Firestore
    public router: Router,
    private formBuilder: FormBuilder) { }

  plantaForm!: FormGroup;
  // Esquema a utilizar en el Html
  planta: any = {
    id: 1,
    nombrePlanta: '',
    nombreCientifico: '',
    categoria: 0,
    precio: 0,
    stock: 0,
    descripcion: '',
    imagen: ''
  };
  categorias: any = [];
  id: any = '';

  ngOnInit() {
    console.log("ngOnInit ID:" + this.route.snapshot.params['id']);
    // Relizamos lectura
    this.getPlanta(this.route.snapshot.params['id']);
    this.getCategory();
    // Especificamos Validaciones por medio de FormGroup
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
    this.restApiC.getCategorias().subscribe({
      next: (res) => { 
        console.log("Res:" + res);
        this.categorias = res;
        console.log("thisCategoria:", this.categorias);
        loading.dismiss();
      },
      complete: () => { },
      error: (err) => {
        console.log("Err:" + err);
        loading.dismiss();
      }
    });
  }

  async getPlanta(id: number) {
    // Crea Wait
    const loading = await this.loadingController.create({
      message: 'Loading...'
    });
    // Muestra Wait
    await loading.present();
    // Obtiene el Observable
    this.restApi.getPlanta(id + "").subscribe({
      next: (data) => {
        console.log("getProductID data****");
        console.log(data);
        // Si funciona Rescata el los datos
        this.id = data.id;
        // Actualiza los datos
        this.plantaForm.setValue({
          plant_name: data.nombrePlanta,
          plant_scientific_name: data.nombreCientifico,
          plant_category: data.categoria,
          plant_price: data.precio,
          plant_stock: data.stock,
          plant_img: data.imagen,
          plant_desc: data.descripcion
        });
        loading.dismiss();
      },
      complete: () => { },
      error: (err) => {
        console.log("getProductID Errr****+");
        console.log(err);
        loading.dismiss();
      }
    });
  }

  async onFormSubmit(form: NgForm) {
    console.log("onFormSubmit ID:" + this.id)
    this.planta.id = this.id;
    this.planta.nombrePlanta = this.plantaForm.value.plant_name;
    this.planta.nombreCientifico = this.plantaForm.value.plant_scientific_name;
    this.planta.categoria = this.plantaForm.value.plant_category;
    this.planta.precio = this.plantaForm.value.plant_price;
    this.planta.stock = this.plantaForm.value.plant_stock;
    this.planta.imagen = this.plantaForm.value.plant_img;
    this.planta.descripcion = this.plantaForm.value.plant_desc;

    // Crea Wait
    const loading = await this.loadingController.create({
      message: 'Actualizando...'
    });
    // Muestra Wait
    await loading.present();

    try {
      await this.restApi.updatePlanta(this.id, this.planta);
      loading.dismiss();
      this.router.navigate(['admin/productos']);
      // window.location.reload();
    } catch (err) {
      console.log(err);
      loading.dismiss();
    }
  }
}