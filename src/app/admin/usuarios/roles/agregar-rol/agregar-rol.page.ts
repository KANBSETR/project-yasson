import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { LoadingController, AlertController } from '@ionic/angular';
import { ToastController, ModalController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { FirestoreService } from '../../../services/roles/rol.service';

@Component({
  selector: 'app-agregar-rol',
  templateUrl: './agregar-rol.page.html',
  styleUrls: ['./agregar-rol.page.scss'],
})
export class AgregarRolPage implements OnInit {
  rolForm!: FormGroup;
  rol: any = {
    nombre: '',
    descripcion: ''
  };

  roles: any = [];

  constructor(
    private formBuilder: FormBuilder,
    public loadingController: LoadingController,
    private restApi: FirestoreService,
    private router: Router,
    public toastController: ToastController
  ) { }

  ngOnInit() {
    this.getRoles();
    this.rolForm = this.formBuilder.group({
      'nombre': [null, Validators.required],
      'descripcion': [null, Validators.required]
    });
  }

  async onFormSubmit(form: NgForm) {
    const loading = await this.loadingController.create({
      message: 'Loading...'
    });
    await loading.present();

    this.restApi.addRol(this.rol)
      .subscribe({
        next: async (data: any) => {
          console.log("Next addRol Page", data);
          loading.dismiss();
          if (data == null) {
            console.log("Next no agrego, Data Null");
          } else {
            console.log("Next agrego, Data Not Null, actualizando lista de roles");
            await this.getRoles(); // Actualizar la lista de roles

            // Mostrar mensaje de confirmación
            const toast = await this.toastController.create({
              message: 'Usuario agregado correctamente.',
              duration: 3000,
              position: 'top',
              color: 'success'
            });
            toast.present();

            // Navegar a la página de roles
            this.router.navigate(['/admin/usuarios/roles']);
          }
        },
        complete: () => { },
        error: (error_msg: any) => {
          //console.log("Error addRol Page", error_msg);
          loading.dismiss();
        }
      });
    console.log("Fin de la ejecución del método onFormSubmit");
  }

  async getRoles() {
    console.log("Prueba: getRoles");
    const loading = await this.loadingController.create({
      message: 'Loading...'
    });
    await loading.present();
    //console.log("Prueba: await loading.present()");
    this.restApi.getRoles()
      .subscribe({
        next: (data: any) => {
          //console.log("Next getRoles Page", data);
          this.roles = data;
          console.log("Roles", this.roles);
          loading.dismiss();
        },
        complete: () => { },
        error: (error_msg: any) => {
          //console.log("Error getRoles Page", error_msg);
          loading.dismiss();
        }
      });
  }
}