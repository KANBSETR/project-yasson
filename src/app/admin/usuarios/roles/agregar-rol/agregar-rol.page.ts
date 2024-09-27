import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { LoadingController, AlertController } from '@ionic/angular';
import { ToastController, ModalController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { IRol } from 'src/app/models/IRoles';
import { RolService } from '../../../services/roles/rol.service';



import Swal from 'sweetalert2';
import { data } from 'jquery';

@Component({
  selector: 'app-agregar-rol',
  templateUrl: './agregar-rol.page.html',
  styleUrls: ['./agregar-rol.page.scss'],
})
export class AgregarRolPage implements OnInit {
  rolForm!: FormGroup;
  rol: IRol = {
    id: Math.floor(Math.random() * 1000),
    nombre: '',
    descripcion: ''
  };

  roles: any = [];

  // Injectamos FormBuilder, el cual nos permitirá realizar validaciones
  constructor(
    private formBuilder: FormBuilder,
    public loadingController: LoadingController,
    private restApi: RolService,
    private restApir: RolService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.getRoles();
    // Especificamos que todos los campos son obligatorios
    this.rolForm = this.formBuilder.group({
      'nombre': [null, Validators.required],
      'descripcion': [null, Validators.required]
    });
  }

  async onFormSubmit(form: NgForm) {
    const loading = await this.loadingController.create({
      message: 'Loading...'
    });

    // Genra un nuevo ID antes de enviar el formulario
    // const usuarioData = {
    //   ...this.usuarioForm.value,
    //   id: Math.floor(Math.random() * 1000)
    // };

    // Ejecuta el método del servicio y los suscribe
    await this.restApi.addRol(this.rol)
      .subscribe({
        next: (data) => {
          console.log("Next addRol Page", data)
          loading.dismiss();
          if (data == null) {
            console.log("Next no agrego, Data Null")
          }
          // Si viene respuesta
          console.log("Next agrego, Data Not Null, Router /admin/usuarios/roles;", this.router);
          this.router.navigate(['/admin/usuarios/roles']);
          //window.location.reload();
        }
        , complete: () => { }
        , error: (error_msg) => {
          console.log("Error addRol Page", error_msg)
          loading.dismiss(); // Cierra el Loading
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
    console.log("Prueba: await loading.present()");
    // Ejecuta el método del servicio y los suscribe
    await this.restApir.getRoles()
      .subscribe({
        next: (data) => {
          console.log("Next getRoles Page", data)
          this.roles = data;
          console.log("Roles", this.roles);
          loading.dismiss(); // Cierra el Loading
          
        }
        , complete: () => { }
        , error: (error_msg) => {
          console.log("Error getRoles Page", error_msg)
          loading.dismiss(); // Cierra el Loading
        }
      });
  }
}
