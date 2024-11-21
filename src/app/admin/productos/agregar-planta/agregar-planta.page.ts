import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { LoadingController, AlertController, ToastController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { FirestoreServicePlantas } from '../../services/plantas/planta.service';
import { FirestoreServiceCategoria } from '../../services/categorias/categoria.service';
import { Location } from '@angular/common'; 
import { UtilsService } from '../../../auth/services/utils.service';
@Component({
  selector: 'app-agregar-planta',
  templateUrl: './agregar-planta.page.html',
  styleUrls: ['./agregar-planta.page.scss'],
})
export class AgregarPlantaPage implements OnInit {
  plantaForm!: FormGroup;
  planta: any = {
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

  constructor(
    private formBuilder: FormBuilder,
    public loadingController: LoadingController,
    private restApiPlantas: FirestoreServicePlantas,
    private restApiCategorias: FirestoreServiceCategoria,
    private router: Router,
    public toastController: ToastController,
    private location: Location,
    private utilsService: UtilsService

  ) { }

  ngOnInit() {
    this.getCategorias();
    this.plantaForm = this.formBuilder.group({
      'nombrePlanta': [null, [Validators.required, Validators.maxLength(50), this.noSpecialCharsValidator]],
      'nombreCientifico': [null, [Validators.required, Validators.maxLength(50), this.noSpecialCharsValidator]],
      'categoria': [null, Validators.required],
      'precio': [null, [Validators.required, Validators.min(0)]],
      'stock': [null, [Validators.required, Validators.min(0)]],
      'imagen': [null, Validators.required],
      'descripcion': [null, [Validators.required, Validators.maxLength(200), this.noSpecialCharsValidator]]
    });

    this.plantaForm.get('nombrePlanta')?.valueChanges.subscribe(value => {
      this.checkFieldErrors('nombrePlanta');
    });

    this.plantaForm.get('nombreCientifico')?.valueChanges.subscribe(value => {
      this.checkFieldErrors('nombreCientifico');
    });

    this.plantaForm.get('descripcion')?.valueChanges.subscribe(value => {
      this.checkFieldErrors('descripcion');
    });
  }

  noSpecialCharsValidator(control: FormControl) {
    const forbiddenChars = /[#$%&!"°|/()='?¿¡´+{}¨*;,><]/;
    const hasForbiddenChars = forbiddenChars.test(control.value);
    return hasForbiddenChars ? { 'forbiddenChars': { value: control.value } } : null;
  }

  async presentToast(message: string, color: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 1000,
      position: 'top',
      color: color
    });
    toast.present();
  }

  checkFieldErrors(field: string) {
    const control = this.plantaForm.get(field);
    if (control?.hasError('forbiddenChars')) {
      this.presentToast(`El ${field} no debe contener caracteres especiales como #$%&!"°|/()='?¿¡´+{}¨*;,><.`, 'danger');
    }
  }

  async onFormSubmit() {
    if (this.plantaForm.invalid) {
      this.checkFieldErrors('nombrePlanta');
      this.checkFieldErrors('nombreCientifico');
      this.checkFieldErrors('descripcion');
      return;
    }

    const loading = await this.loadingController.create({
      message: 'Guardando...'
    });
    await loading.present();

    this.planta = this.plantaForm.value; // Actualiza el objeto planta con los valores del formulario

    this.restApiPlantas.addPlanta(this.planta)
      .subscribe({
        next: async () => {
          console.log("Next addPlanta Page");
          loading.dismiss();
          console.log("Next agrego, Data Not Null, actualizando lista de plantas");

          // Navegar a la página de plantas
          this.router.navigateByUrl('/admin/productos');

          // Mostrar mensaje de confirmación
          this.presentToast('Planta agregada correctamente.', 'success');
        },
        error: async (error_msg: any) => {
          console.log("Error addPlanta Page", error_msg);
          loading.dismiss();
          // Mostrar mensaje de error
          this.presentToast('Error al agregar la planta.', 'danger');

          // Redirigir a la página de plantas incluso si hay un error
          this.router.navigateByUrl('/admin/productos'); // Navegar a la página de plantas
        }
      });
    console.log("Fin de la ejecución del método onFormSubmit");
  }

  async getCategorias() {
    console.log("Prueba: getCategorias");
    const loading = await this.loadingController.create({
      message: 'Cargando...'
    });
    await loading.present();
    this.restApiCategorias.getCategorias()
      .subscribe({
        next: (data: any) => {
          this.categorias = data;
          console.log("Categorias", this.categorias);
          loading.dismiss();
        },
        complete: () => { },
        error: (error_msg: any) => {
          console.log("Error getCategorias Page", error_msg);
          loading.dismiss();
        }
      });
  }


  async tomarImagen(){
    const dataUrl = (await this.utilsService.tomarFoto('Imagen de la planta')).dataUrl;
    this.plantaForm.controls['imagen'].setValue(dataUrl);
    
  }




}