import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { LoadingController, AlertController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoriaService } from 'src/app/admin/services/categorias/categoria.service';
import { ICategoria } from 'src/app/models/ICategorias';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-agregar-categoria',
  templateUrl: './agregar-categoria.page.html',
  styleUrls: ['./agregar-categoria.page.scss'],
})
export class AgregarCategoriaPage implements OnInit {
  categoriaForm!: FormGroup;
  categoria: ICategoria = {
    id: Math.floor(Math.random() * 1000),
    nombre: '',
    descripcion: ''
  };

  categorias: any = [];
  constructor(private formBuilder: FormBuilder,
    public loadingController: LoadingController,
    private restApi: CategoriaService,
    private router: Router,
  ) {
  }
  ngOnInit() {
    // Especificamos que todos los campos son obligatorios
    this.categoriaForm = this.formBuilder.group({
      "cate_name": [null, Validators.required],
      'cate_desc': [null, Validators.required],
    });
  }
  async onFormSubmit(form: NgForm) {
    // Creamos un Loading Controller, Ojo no lo muestra
    const loading = await this.loadingController.create({
      message: 'Loading...'
    });

    // Ejecuta el método del servicio y los suscribe
    await this.restApi.addCategoria(this.categoria)
      .subscribe({
        next: (res) => {
          console.log("Next AddProduct Page", res)
          loading.dismiss(); //Elimina la espera
          if (res == null) { // No viene respuesta del registro
            console.log("Next No Agrego, Ress Null ");
            return
          }
          // Si viene respuesta
          console.log("Next Agrego SIIIIII Router saltaré ;", this.router);
          this.router.navigate(['/admin/productos/categoria']);
        }
        , complete: () => { }
        , error: (err) => {
          console.log("Error AddProduct Página", err);
          loading.dismiss(); //Elimina la espera
        }
      });
    console.log("Observe que todo lo del suscribe sale después de este mensaje")
  }
}








// async presentAlert() {
//   Swal.fire({
//     title: 'Categoria agregada correctamente',
//     icon: 'success',
//     timer: 2000,
//     position: 'top',
//     showConfirmButton: false,
//     toast: true
//   });
// }