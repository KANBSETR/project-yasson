import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import { FirestoreService } from '../../services/roles/rol.service';

@Component({
  selector: 'app-agregar-usuario',
  templateUrl: './agregar-usuario.page.html',
  styleUrls: ['./agregar-usuario.page.scss'],
})
export class AgregarUsuarioPage implements OnInit {
  usuarioForm!: FormGroup;
  usuario: any = {
    nombres: '',
    apellidos: '',
    correo: '',
    contrasena: '',
    rol: ''
  };

  roles: any[] = []; // Definir la propiedad roles como un array

  constructor(
    private formBuilder: FormBuilder,
    public loadingController: LoadingController,
    private restApi: FirestoreService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.getRoles();
    this.usuarioForm = this.formBuilder.group({
      'nombres': [null, Validators.required],
      'apellidos': [null, Validators.required],
      'correo': [null, [Validators.required, Validators.email]],
      'contrasena': [null, Validators.required],
      'rol': [null, Validators.required]
    });
  }

  async onFormSubmit(form: any) {
    const loading = await this.loadingController.create({
      message: 'Loading...'
    });
    await loading.present();

    this.restApi.addRol(this.usuario)
      .subscribe({
        next: (data: any) => {
          console.log("Next addUsuario Page", data);
          loading.dismiss();
          if (data == null) {
            console.log("Next no agrego, Data Null");
          } else {
            console.log("Next agrego, Data Not Null, Router /admin/usuarios/roles;", this.router);
            this.router.navigate(['/admin/usuarios/roles']);
          }
        },
        complete: () => { },
        error: (error_msg: any) => {
          console.log("Error addUsuario Page", error_msg);
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
    console.log("Prueba: await loading.present()");
    this.restApi.getRoles()
      .subscribe({
        next: (data: any) => {
          console.log("Next getRoles Page", data);
          this.roles = data;
          console.log("Roles", this.roles);
          loading.dismiss();
        },
        complete: () => { },
        error: (error_msg: any) => {
          console.log("Error getRoles Page", error_msg);
          loading.dismiss();
        }
      });
  }
}