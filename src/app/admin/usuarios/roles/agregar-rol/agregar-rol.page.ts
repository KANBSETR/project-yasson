import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { LoadingController, AlertController, ToastController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { FirestoreServiceRoles } from '../../../services/roles/rol.service';
import { Location } from '@angular/common'; // Importa el servicio Location correctamente

@Component({
  selector: 'app-agregar-rol',
  templateUrl: './agregar-rol.page.html',
  styleUrls: ['./agregar-rol.page.scss'],
})
export class AgregarRolPage implements OnInit {
  rolForm!: FormGroup;
  rol: any = {
    nombre: '',
    descripcion: '',
    permisosRoles: {
      puedeCrear: false,
      puedeEditar: false,
      puedeEliminar: false
    },
    permisosUsuarios: {
      puedeAgregar: false,
      puedeModificar: false,
      puedeEliminar: false
    },
    permisosPlantas: {
      puedeAgregar: false,
      puedeModificar: false,
      puedeEliminar: false
    }
  };

  roles: any = [];

  constructor(
    private formBuilder: FormBuilder,
    public loadingController: LoadingController,
    private restApi: FirestoreServiceRoles,
    private router: Router,
    public toastController: ToastController,
    private location: Location // Inyecta el servicio Location
  ) { }

  ngOnInit() {
    this.getRoles();
    this.rolForm = this.formBuilder.group({
      'nombre': [null, [Validators.required, Validators.maxLength(15), this.noSpecialCharsValidator]],
      'descripcion': [null, [Validators.required, Validators.maxLength(50), this.noSpecialCharsValidator]],
      'permisosRoles': this.formBuilder.group({
        'puedeCrear': [false],
        'puedeEditar': [false],
        'puedeEliminar': [false]
      }),
      'permisosUsuarios': this.formBuilder.group({
        'puedeAgregar': [false],
        'puedeModificar': [false],
        'puedeEliminar': [false]
      }),
      'permisosPlantas': this.formBuilder.group({
        'puedeAgregar': [false],
        'puedeModificar': [false],
        'puedeEliminar': [false]
      })
    });

    this.rolForm.get('nombre')?.valueChanges.subscribe(value => {
      this.checkFieldErrors('nombre');
    });

    this.rolForm.get('descripcion')?.valueChanges.subscribe(value => {
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
    const control = this.rolForm.get(field);
    if (control?.hasError('forbiddenChars')) {
      this.presentToast(`El ${field} no debe contener caracteres especiales como #$%&!"°|/()='?¿¡´+{}¨*;,><.`, 'danger');
    }
  }

  async onFormSubmit() {
    if (this.rolForm.invalid) {
      this.checkFieldErrors('nombre');
      this.checkFieldErrors('descripcion');
      return;
    }

    const loading = await this.loadingController.create({
      message: 'Loading...'
    });
    await loading.present();

    this.rol = this.rolForm.value; // Actualiza el objeto rol con los valores del formulario

    this.restApi.addRol(this.rol)
      .subscribe({
        next: async () => {
          console.log("Next addRol Page");
          loading.dismiss();
          console.log("Next agrego, Data Not Null, actualizando lista de roles");
          await this.getRoles(); // Actualizar la lista de roles

          // Navegar a la página de roles
          this.router.navigateByUrl('/admin/usuarios/roles');

          // Mostrar mensaje de confirmación
          this.presentToast('Rol agregado correctamente.', 'success');
        },
        error: async (error_msg: any) => {
          console.log("Error addRol Page", error_msg);
          loading.dismiss();
          // Mostrar mensaje de error
          this.presentToast('Error al agregar el rol.', 'danger');

          // Redirigir a la página de roles incluso si hay un error
          this.router.navigateByUrl('/admin/usuarios/roles'); // Navegar a la página de roles
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
    this.restApi.getRoles()
      .subscribe({
        next: (data: any) => {
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