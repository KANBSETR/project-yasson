import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoadingController, ToastController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { FirestoreServiceUsuarios } from '../../services/usuarios/usuario.service';

@Component({
  selector: 'app-modificar-usuarios',
  templateUrl: './modificar-usuarios.page.html',
  styleUrls: ['./modificar-usuarios.page.scss'],
})
export class ModificarUsuarioPage implements OnInit {
  usuarioForm!: FormGroup;
  usuario: any = {
    id: '',
    usuario: '',
    correo: '',
    contrasena: '',
    nombres: '',
    apellidos: '',
    numeroDeCelular: '',
    edad: ''
  };

  constructor(
    private formBuilder: FormBuilder,
    public loadingController: LoadingController,
    private restApi: FirestoreServiceUsuarios,
    private router: Router,
    public toastController: ToastController,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.usuarioForm = this.formBuilder.group({
      'usuario': [null, Validators.required],
      'correo': [null, [Validators.required, Validators.email]],
      'contrasena': [null, Validators.required],
      'nombres': [null],
      'apellidos': [null],
      'numeroDeCelular': [null],
      'edad': [null]
    });
    this.loadUsuarioData();
  }

  async loadUsuarioData() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      const loading = await this.loadingController.create({
        message: 'Cargando usuario...'
      });
      await loading.present();

      this.restApi.getUsuario(id).subscribe({
        next: (data: any) => {
          this.usuario = data;
          this.usuario.id = id;
          this.usuarioForm.patchValue({
            usuario: this.usuario.usuario,
            correo: this.usuario.correo,
            contrasena: this.usuario.contrasena,
            nombres: this.usuario.nombres,
            apellidos: this.usuario.apellidos,
            numeroDeCelular: this.usuario.numeroDeCelular,
            edad: this.usuario.edad
          });
          loading.dismiss();
        },
        error: (error_msg: any) => {
          console.log("Error cargando usuario", error_msg);
          loading.dismiss();
        }
      });
    }
  }

  async onFormSubmit(form: FormGroup) {
    const loading = await this.loadingController.create({
      message: 'Actualizando usuario...'
    });
    await loading.present();

    this.restApi.updateUsuario(this.usuario.id, form.value).then(async () => {
      loading.dismiss();

      // Mostrar mensaje de confirmación
      const toast = await this.toastController.create({
        message: 'Usuario actualizado correctamente.',
        duration: 3000,
        position: 'top',
        color: 'success'
      });
      toast.present();

      // Navegar a la página de usuarios
      this.router.navigate(['/admin/usuarios']);
    }).catch(async (error_msg: any) => {
      console.log("Error actualizando usuario", error_msg);
      loading.dismiss();

      // Mostrar mensaje de error
      const toast = await this.toastController.create({
        message: `Error actualizando usuario: ${error_msg.message}`,
        duration: 3000,
        position: 'top',
        color: 'danger'
      });
      toast.present();
    });
  }
}