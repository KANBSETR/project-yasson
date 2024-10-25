import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { LoadingController, AlertController, ToastController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { FirestoreServiceCategoria } from '../../../services/categorias/categoria.service';
import { Location } from '@angular/common'; // Importa el servicio Location correctamente

@Component({
  selector: 'app-agregar-categoria',
  templateUrl: './agregar-categoria.page.html',
  styleUrls: ['./agregar-categoria.page.scss'],
})
export class AgregarCategoriaPage implements OnInit {
  categoriaForm!: FormGroup;
  categoria: any = {
    nombre: '',
    descripcion: ''
  };

  categorias: any = [];

  constructor(
    private formBuilder: FormBuilder,
    public loadingController: LoadingController,
    private restApi: FirestoreServiceCategoria,
    private router: Router,
    public toastController: ToastController,
    private location: Location // Inyecta el servicio Location
  ) { }

  ngOnInit() {
    this.getCategorias();
    this.categoriaForm = this.formBuilder.group({
      'nombre': [null, [Validators.required, Validators.maxLength(15), this.noSpecialCharsValidator]],
      'descripcion': [null, [Validators.required, Validators.maxLength(50), this.noSpecialCharsValidator]]
    });

    this.categoriaForm.get('nombre')?.valueChanges.subscribe(value => {
      this.checkFieldErrors('nombre');
    });

    this.categoriaForm.get('descripcion')?.valueChanges.subscribe(value => {
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
    const control = this.categoriaForm.get(field);
    if (control?.hasError('forbiddenChars')) {
      this.presentToast(`El ${field} no debe contener caracteres especiales como #$%&!"°|/()='?¿¡´+{}¨*;,><.`, 'danger');
    }
  }

  async onFormSubmit() {
    if (this.categoriaForm.invalid) {
      this.checkFieldErrors('nombre');
      this.checkFieldErrors('descripcion');
      return;
    }

    const loading = await this.loadingController.create({
      message: 'Guardando...'
    });
    await loading.present();

    this.categoria = this.categoriaForm.value; // Actualiza el objeto categoria con los valores del formulario

    this.restApi.addCategoria(this.categoria)
      .subscribe({
        next: async () => {
          console.log("Next addCategoria Page");
          loading.dismiss();
          console.log("Next agrego, Data Not Null, actualizando lista de categorias");
          await this.getCategorias(); // Actualizar la lista de categorias

          // Navegar a la página de categorias
          this.router.navigateByUrl('/admin/productos/categoria');

          // Mostrar mensaje de confirmación
          this.presentToast('Categoría agregada correctamente.', 'success');
        },
        error: async (error_msg: any) => {
          console.log("Error addCategoria Page", error_msg);
          loading.dismiss();
          // Mostrar mensaje de error
          this.presentToast('Error al agregar la categoría.', 'danger');

          // Redirigir a la página de categorias incluso si hay un error
          this.router.navigateByUrl('/admin/productos/categoria'); // Navegar a la página de categorias
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
    this.restApi.getCategorias()
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
}