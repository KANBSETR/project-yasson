import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { LoadingController, AlertController, ToastController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { FirestoreServiceRoles } from '../../../services/roles/rol.service';

@Component({
  selector: 'app-modificar-roles',
  templateUrl: './modificar-roles.page.html',
  styleUrls: ['./modificar-roles.page.scss'],
})
export class ModificarRolesPage implements OnInit {
  rolForm!: FormGroup;
  rol: any = {
    id: '',
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

  constructor(
    private formBuilder: FormBuilder,
    public loadingController: LoadingController,
    private restApi: FirestoreServiceRoles,
    private router: Router,
    public toastController: ToastController,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
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

    this.loadRolData();
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
    const control = this.rolForm.get(field);
    if (control?.hasError('forbiddenChars')) {
      this.presentToast(`El ${field} no debe contener caracteres especiales como #$%&!"°|/()='?¿¡´+{}¨*;,><.`, 'danger');
    }
  }

  async loadRolData() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      const loading = await this.loadingController.create({
        message: 'Cargando...'
      });
      await loading.present();

      this.restApi.getRol(id).subscribe({
        next: (data: any) => {
          this.rol = data;
          this.rolForm.patchValue(this.rol);
          loading.dismiss();
        },
        error: async (error_msg: any) => {
          console.log("Error loadRolData", error_msg);
          loading.dismiss();
          this.presentToast('Error al cargar los datos del rol.', 'danger');
        }
      });
    }
  }

  async onFormSubmit() {
    if (this.rolForm.invalid) {
      this.checkFieldErrors('nombre');
      this.checkFieldErrors('descripcion');
      return;
    }

    const loading = await this.loadingController.create({
      message: 'Guardando...'
    });
    await loading.present();

    this.rol = { ...this.rol, ...this.rolForm.value }; // Actualiza el objeto rol con los valores del formulario

    this.restApi.updateRol(this.rol.id, this.rol)
      .then(async () => {
        console.log("Next updateRol Page");
        loading.dismiss();
        console.log("Next actualizo, Data Not Null, actualizando lista de roles");

        // Navegar a la página de roles
        this.router.navigateByUrl('/admin/usuarios/roles');

        // Mostrar mensaje de confirmación
        this.presentToast('Rol actualizado correctamente.', 'success');
      })
      .catch(async (error_msg: any) => {
        console.log("Error updateRol Page", error_msg);
        loading.dismiss();
        // Mostrar mensaje de error
        this.presentToast('Error al actualizar el rol.', 'danger');

        // Redirigir a la página de roles incluso si hay un error
        this.router.navigateByUrl('/admin/usuarios/roles'); // Navegar a la página de roles
      });

    console.log("Fin de la ejecución del método onFormSubmit");
  }
}