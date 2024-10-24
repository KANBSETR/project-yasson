import { Component, OnInit } from '@angular/core';
import { LoadingController, AlertController, ToastController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { FirestoreServiceCategoria } from 'src/app/admin/services/categorias/categoria.service'; // Importar el servicio de Firestore

@Component({
  selector: 'app-editar-categoria',
  templateUrl: './editar-categoria.page.html',
  styleUrls: ['./editar-categoria.page.scss'],
})
export class EditarCategoriaPage implements OnInit {
  categoriaForm!: FormGroup;
  categoria: any = {
    id: '',
    nombre: '',
    descripcion: ''
  };

  constructor(
    public loadingController: LoadingController,
    public alertController: AlertController,
    public route: ActivatedRoute,
    private restApi: FirestoreServiceCategoria, // Usar el servicio de Firestore
    public router: Router,
    private formBuilder: FormBuilder,
    public toastController: ToastController
  ) { }

  ngOnInit() {
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

    this.loadCategoriaData();
  }

  noSpecialCharsValidator(control: FormControl) {
    const forbiddenChars = /[#$%&!"°|/()='?¿¡´+{}¨*;,><]/;
    const hasForbiddenChars = forbiddenChars.test(control.value);
    return hasForbiddenChars ? { 'forbiddenChars': { value: control.value } } : null;
  }

  async presentToast(message: string, color: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 3000,
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

  async loadCategoriaData() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      const loading = await this.loadingController.create({
        message: 'Cargando...'
      });
      await loading.present();

      this.restApi.getCategoria(id).subscribe({
        next: (data: any) => {
          this.categoria = data;
          this.categoriaForm.patchValue(this.categoria);
          loading.dismiss();
        },
        error: async (error_msg: any) => {
          console.log("Error loadCategoriaData", error_msg);
          loading.dismiss();
          this.presentToast('Error al cargar los datos de la categoría.', 'danger');
        }
      });
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

    this.categoria = { ...this.categoria, ...this.categoriaForm.value }; // Actualiza el objeto categoria con los valores del formulario

    this.restApi.updateCategoria(this.categoria.id, this.categoria)
      .then(async () => {
        console.log("Next updateCategoria Page");
        loading.dismiss();
        console.log("Next actualizo, Data Not Null, actualizando lista de categorias");

        // Mostrar mensaje de confirmación
        this.presentToast('Categoría actualizada correctamente.', 'success');

        // Navegar a la página de categorias
        this.router.navigateByUrl('/admin/productos/categoria');
      })
      .catch(async (error_msg: any) => {
        console.log("Error updateCategoria Page", error_msg);
        loading.dismiss();
        // Mostrar mensaje de error
        this.presentToast('Error al actualizar la categoría.', 'danger');

        // Redirigir a la página de categorias incluso si hay un error
        this.router.navigateByUrl('/admin/productos/categoria'); // Navegar a la página de categorias
      });

    console.log("Fin de la ejecución del método onFormSubmit");
  }
}