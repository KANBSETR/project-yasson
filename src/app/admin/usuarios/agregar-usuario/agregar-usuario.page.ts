import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { LoadingController, AlertController } from '@ionic/angular';
import { ToastController, ModalController } from '@ionic/angular';
import Swal from 'sweetalert2';
import { IUsuario } from 'src/app/models/IUsuarios';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuarioService } from '../../services/usuarios/usuario.service';
import { RolService } from '../../services/roles/rol.service';

@Component({
  selector: 'app-agregar-usuario',
  templateUrl: './agregar-usuario.page.html',
  styleUrls: ['./agregar-usuario.page.scss'],
})

export class AgregarUsuarioPage implements OnInit {
  usuarioForm!: FormGroup;
  usuario: IUsuario = {
    id: Math.floor(Math.random() * 1000),
    nombres: '',
    apellidos: '',
    correo: '',
    contrasena: '',
    rol: 0
  };

  roles: any = [];

  // Injectamos FormBuilder, el cual nos permitirá realizar validaciones
  constructor(
    private formBuilder: FormBuilder,
    public loadingController: LoadingController,
    private restApi: UsuarioService,
    private restApiR: RolService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.getRoles();
    // Especificamos que todos los campos son obligatorios
    this.usuarioForm = this.formBuilder.group({
      'nombres': [null, Validators.required],
      'apellidos': [null, Validators.required],
      'correo': [null, [Validators.required, Validators.email]],
      'contrasena': [null, Validators.required],
      'rol': [null, Validators.required],
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
    await this.restApi.addUsuario(this.usuario)
      .subscribe({
        next: (data) => {
          console.log("Next addUsuario Page", data)
          loading.dismiss(); // Cierra el Loading
          if (data == null) {
            console.log("Next no agrego, data Null");
          }
          // Si viene respuesta
          console.log("Next Agrego, Ress Not Null, Router /admin/usuarios ;", this.router);
          this.router.navigate(['/admin/usuarios']);
          //window.location.reload();
        }
        , complete: () => { }
        , error: (error_msg) => {
          console.log("Error addUsuario Page", error_msg)
          loading.dismiss(); // Cierra el Loading
        }
      });
    console.log("Fin de la ejecución del método onFormSubmit");
  }

  async getRoles() {
    console.log("Prueba: getroles");
    const loading = await this.loadingController.create({
      message: 'Loading...'
    });
    // Lo muestra
    await loading.present();
    console.log("Prueba: await loading.present()");
    // Ejecuta el método del servicio y los suscribe
    await this.restApiR.getRoles()
      .subscribe({
        next: (data) => {
          console.log("Next getRoles Page", data)
          this.roles = data;
          console.log("Roles", this.roles);
          loading.dismiss(); // Termia el Loading
        }
        , complete: () => { }
        , error: (error_msg) => {
          console.log("Error getRoles Page", error_msg)
          loading.dismiss();
        }
      });
  }
}