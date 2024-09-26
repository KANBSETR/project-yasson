import { Component, OnInit } from '@angular/core';
// Imporamos librerías
import { LoadingController, AlertController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';

import { ICategoria } from 'src/app/models/ICategorias';
import { CategoriaService } from 'src/app/admin/services/categorias/categoria.service';


@Component({
  selector: 'app-editar-categoria',
  templateUrl: './editar-categoria.page.html',
  styleUrls: ['./editar-categoria.page.scss'],
})
export class EditarCategoriaPage implements OnInit {

  constructor(
    public loadingController: LoadingController,
    public alertController: AlertController,
    public route: ActivatedRoute,
    private restApi: CategoriaService,
    public router: Router,
    private formBuilder: FormBuilder) { }

    categoriaForm!: FormGroup;
    // Esquema a utilizar en el Html
    categoria: ICategoria = {
      id: 1,
      nombre: '',
      descripcion: '',
    };
    id: any = '';
  
    ngOnInit() {
      console.log("ngOnInit ID:" + this.route.snapshot.params['id']);
      // Relizamos lectura
      this.getCategoria(this.route.snapshot.params['id']);
      // Especificamos Validaciones por medio de FormGroup
      this.categoriaForm = this.formBuilder.group({
        "cate_name" : [null, Validators.required],
        'cate_desc' : [null, Validators.required],
      });
    }
 
    async getCategoria(id: number) {
      // Crea Wait
      const loading = await this.loadingController.create({
        message: 'Loading...'
      });
      // Muestra Wait
      await loading.present();
      // Obtiene el Observable
      await this.restApi.getCategoria(id + "")
        .subscribe({
          next: (data) => {
            console.log("getProductID data****");
            console.log(data);
            // Si funciona Rescata el los datos
            this.id = data.id;
            // Actualiza los datos
            this.categoriaForm.setValue({
              cate_name: data.nombre,
              cate_desc: data.descripcion
            });
            loading.dismiss();
          }
          , complete: () => { }
          , error: (err) => {
            console.log("getProductID Errr****+");
            console.log(err);
            loading.dismiss();
          }
        })
    }
    async onFormSubmit(form: NgForm) {
      console.log("onFormSubmit ID:" + this.id)
      this.categoria.id = this.id;
      await this.restApi.updateCategoria(this.id, this.categoria)
        .subscribe({
          next: (res) => {
            let id = res['id'];
            this.router.navigate(['admin/productos/categoria']);
          }
          , complete: () => { }
          , error: (err) => { console.log(err); }
        })
    }

}
