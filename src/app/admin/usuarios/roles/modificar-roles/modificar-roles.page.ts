import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoadingController, AlertController } from '@ionic/angular';
import { ToastController, ModalController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { FirestoreService } from '../../../services/roles/rol.service';

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
    descripcion: ''
  };

  constructor(
    private formBuilder: FormBuilder,
    public loadingController: LoadingController,
    private restApi: FirestoreService,
    private router: Router,
    public toastController: ToastController,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.rolForm = this.formBuilder.group({
      'nombre': [null, Validators.required],
      'descripcion': [null, Validators.required]
    });
    this.loadRolData();
  }

  async loadRolData() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      const loading = await this.loadingController.create({
        message: 'Cargando rol...'
      });
      await loading.present();

      this.restApi.getRol(id).subscribe({
        next: (data: any) => {
          this.rol = data;
          this.rol.id = id;
          this.rolForm.patchValue({
            nombre: this.rol.nombre,
            descripcion: this.rol.descripcion
          });
          loading.dismiss();
        },
        error: (error_msg: any) => {
          console.log("Error cargando rol", error_msg);
          loading.dismiss();
        }
      });
    }
  }

  async onFormSubmit(form: FormGroup) {
    const loading = await this.loadingController.create({
      message: 'Actualizando rol...'
    });
    await loading.present();

    this.restApi.updateRol(this.rol.id, form.value)
      .subscribe({
        next: async (data: any) => {
          console.log("Rol actualizado", data);
          loading.dismiss();

          // Mostrar mensaje de confirmación
          const toast = await this.toastController.create({
            message: 'Rol actualizado correctamente.',
            duration: 3000,
            position: 'top',
            color: 'success'
          });
          toast.present();

          // Navegar a la página de roles
          this.router.navigate(['/admin/usuarios/roles']);
        },
        complete: () => { },
        error: (error_msg: any) => {
          console.log("Error actualizando rol", error_msg);
          loading.dismiss();
        }
      });
    console.log("Fin de la ejecución del método onFormSubmit");
  }
}