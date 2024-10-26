import { Component, OnInit, OnDestroy } from '@angular/core';
import { ToastController, ModalController } from '@ionic/angular';
import { FirestoreServicePlantas } from '../services/plantas/planta.service'; // Importar el servicio de Firestore
import { LoadingController, AlertController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { VisualizarPlantaComponent } from './modal-planta/visualizar-planta.component'; // Importar el componente

@Component({
  selector: 'app-productos',
  templateUrl: './productos.page.html',
  styleUrls: ['./productos.page.scss'],
})
export class ProductosPage implements OnInit, OnDestroy {

  plantas: any[] = [];
  filteredPlantas: any[] = [];
  searchTerm: string = '';
  isViewing: boolean = false; // Flag para evitar llamadas múltipl

  constructor(
    public restApi: FirestoreServicePlantas,
    public loadingController: LoadingController,
    public alertController: AlertController,
    public toastController: ToastController,
    public router: Router,
    private modalController: ModalController
  ) {}

  ngOnInit() {
    this.getPlantas();
  }

  ngOnDestroy() {
    // Cerrar cualquier instancia abierta de SweetAlert al destruir el componente
  }

  async getPlantas() {
    console.log("Entrando :getPlanta");
    // Crea un Wait (Esperar)
    const loading = await this.loadingController.create({
      message: 'Cargando plantas...'
    });
    // Muestra el Wait
    await loading.present();
    console.log("Entrando :");
    // Obtiene el Observable del servicio
    this.restApi.getPlantas().subscribe({
      next: (res) => {
        console.log("Res:", res);
        // Si funciona asigno el resultado al arreglo plantas
        this.plantas = res;
        this.filteredPlantas = [...this.plantas]; // Inicializa las plantas filtradas
        console.log("thisPlantas:", this.plantas);
        loading.dismiss();
      },
      complete: () => {},
      error: (err) => {
        // Si da error, imprimo en consola.
        console.log("Err:", err);
        loading.dismiss();
      }
    });
  }

  async deletePlanta(id: string) {
    // Usar AlertController para confirmar la eliminación
    const alert = await this.alertController.create({
      header: '¿Estás seguro?',
      message: `¿Deseas eliminar la planta?`,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Sí, eliminar',
          handler: () => {
            this.deleteConfirmado(id);
          }
        }
      ]
    });

    await alert.present();
  }

  async deleteConfirmado(id: string) {
    const loading = await this.loadingController.create({
      message: 'Eliminando planta...'
    });
    await loading.present();
    // Llama al servicio para eliminar la planta
    this.restApi.deletePlanta(id)
      .subscribe({
        next: async (data) => {
          console.log("Planta eliminada: ", data);
          loading.dismiss();

          // Toast de éxito
          const toastSuccess = await this.toastController.create({
            message: 'Planta eliminada exitosamente.',
            duration: 3000,
            position: 'top',
            color: 'success', 
            buttons: [
              {
                side: 'end',
                icon: 'checkmark-circle-outline',
                handler: () => {
                  console.log('Toast de éxito cerrado');
                }
              }
            ]
          });
          toastSuccess.present();

          // Actualizar la lista de plantas
          this.getPlantas();
        },
        complete: () => { },
        error: async (error_msg) => {
          console.log("Error eliminando planta:", error_msg);
          loading.dismiss();

          // Toast de error
          const toastError = await this.toastController.create({
            message: `Error eliminando planta: ${error_msg.message}`,
            duration: 3000,
            position: 'top',
            color: 'danger', 
            buttons: [
              {
                side: 'end',
                icon: 'alert-circle-outline',
                handler: () => {
                  console.log('Toast de error cerrado');
                }
              }
            ]
          });
          toastError.present();
        }
      });
  }

  async editPlanta(id: string) {
    // Navegar a la página de edición de la planta
    this.router.navigate(['/admin/productos/editar-planta', id]);
  }

  async viewPlanta(id: string) {
    if (this.isViewing) return; // Evitar llamadas múltiples
    this.isViewing = true;
    console.log('Iniciando viewPlanta');

    const loading = await this.loadingController.create({
      message: 'Cargando detalles de la planta...'
    });
    await loading.present();

    this.restApi.getPlanta(id).subscribe({
      next: async (planta) => {
        const modal = await this.modalController.create({
          component: VisualizarPlantaComponent,
          componentProps: { planta }
        });
        await modal.present();
        loading.dismiss();
        this.isViewing = false; // Resetear el flag
      },
      error: (error) => {
        console.error('Error al cargar detalles de la planta', error);
        loading.dismiss();
        this.isViewing = false; // Resetear el flag
      }
    });
  }

  filterPlantas() {
    const searchTermLower = this.searchTerm.toLowerCase();
    this.filteredPlantas = this.plantas.filter(planta => 
      planta.nombrePlanta.toLowerCase().includes(searchTermLower)
    );
  }

  
}