import { Component, OnInit, OnDestroy } from '@angular/core';
import { ToastController, ModalController } from '@ionic/angular';
import { FirestoreServiceCategoria } from '../../services/categorias/categoria.service'; // Importar el servicio de Firestore
import { LoadingController, AlertController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { VisualizarCategoriaComponent } from './modal-categoria/visualizar-categoria.component'; // Importar el componente

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.page.html',
  styleUrls: ['./categoria.page.scss'],
})
export class CategoriaPage implements OnInit, OnDestroy {

  categorias: any[] = [];
  filteredCategorias: any[] = [];
  searchTerm: string = '';
  isViewing: boolean = false; // Flag para evitar llamadas múltiples

  constructor(
    public restApi: FirestoreServiceCategoria,
    public loadingController: LoadingController,
    public alertController: AlertController,
    public toastController: ToastController,
    public router: Router,
    private modalController: ModalController
  ) {}

  ngOnInit() {
    this.getCategorias();
  }

  ngOnDestroy() {
    // Cerrar cualquier instancia abierta de SweetAlert al destruir el componente
  }

  async getCategorias() {
    console.log("Prueba: getCategorias");
    const loading = await this.loadingController.create({
      message: 'Cargando categorías...'
    });
    // Muestra el Wait
    await loading.present();
    // Obtiene el Observable del servicio
    this.restApi.getCategorias()
      .subscribe({
        next: (data) => {
          console.log("Respuesta: ", data);
          // Si funciona asigno el resultado al arreglo categorias
          this.categorias = data.map(categoria => ({
            id: categoria.id,
            nombre: categoria.nombre,
            descripcion: categoria.descripcion
          }));
          this.filteredCategorias = [...this.categorias]; // Inicializa las categorías filtradas
          console.log("this.categorias:", this.categorias);
          loading.dismiss();
        },
        complete: () => { },
        error: (error_msg) => {
          // Si da error, imprimo en consola.
          console.log("Error:", error_msg);
          loading.dismiss();
        }
      });
  }

  async deleteCategoria(id: string) {
    // Usar AlertController para confirmar la eliminación
    const alert = await this.alertController.create({
      header: '¿Estás seguro?',
      message: `¿Deseas eliminar la categoría?`,
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
      message: 'Eliminando categoría...'
    });
    await loading.present();
    // Llama al servicio para eliminar la categoría
    this.restApi.deleteCategoria(id)
      .subscribe({
        next: async (data) => {
          console.log("Categoría eliminada: ", data);
          loading.dismiss();

          // Toast de éxito
          const toastSuccess = await this.toastController.create({
            message: 'Categoría eliminada exitosamente.',
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

          // Actualizar la lista de categorías
          this.getCategorias();
        },
        complete: () => { },
        error: async (error_msg) => {
          console.log("Error eliminando categoría:", error_msg);
          loading.dismiss();

          // Toast de error
          const toastError = await this.toastController.create({
            message: `Error eliminando categoría: ${error_msg.message}`,
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

  async editCategoria(id: string) {
    // Navegar a la página de edición de la categoría
    this.router.navigate(['/admin/productos/categoria/editar-categoria', id]);
  }

  async viewCategoria(id: string) {
    if (this.isViewing) return; // Evitar llamadas múltiples
    this.isViewing = true;
    console.log('Iniciando viewCategoria');

    const loading = await this.loadingController.create({
      message: 'Cargando detalles de la categoría...'
    });
    await loading.present();

    this.restApi.getCategoria(id).subscribe({
      next: async (categoria) => {
        const modal = await this.modalController.create({
          component: VisualizarCategoriaComponent,
          componentProps: { categoria }
        });
        await modal.present();
        loading.dismiss();
        this.isViewing = false; // Resetear el flag
      },
      error: (error) => {
        console.error('Error al cargar detalles de la categoría', error);
        loading.dismiss();
        this.isViewing = false; // Resetear el flag
      }
    });
  }

  filterCategorias() {
    const searchTermLower = this.searchTerm.toLowerCase();
    this.filteredCategorias = this.categorias.filter(categoria => 
      categoria.nombre.toLowerCase().includes(searchTermLower)
    );
  }
}