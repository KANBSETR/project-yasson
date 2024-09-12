import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Species } from '../models/species.model'; // Importar el interface, harrys dijo que era para mantener 
                                                  //  los datos, obligar a que los datos sean de ese tipo

@Component({
  selector: 'app-test-api',
  templateUrl: './test-api.component.html',
  styleUrls: ['./test-api.component.scss']
})

export class TestApiComponent implements OnInit {
  getDataResponse: any;
  speciesList: Species[] = []; // Usar la interfaz para tipar la lista de especies, no funciono porque no encontre una forma de filtrar bien las plantas
  plantId: number | null = null;
  page: number = 1;
  totalPages: number = 2; // Esto limita el numero de paginas porsiacaso
  cache: { [key: number]: Species[] } = {}; // Usar la interfaz para tipar la caché, no funciono porque no encontre una forma de filtrar bien las plantas
  showAllOrigins: boolean = false; // Variable para mostrar todos los origenes de la planta, no pude comprobar porque se me acabaron las solicitudes

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.loadSpeciesList();
  }

  onSubmit(event: Event) { // Este es el evento para obtener los datos, osea el input del buscar, si ven el html se entiende más
    event.preventDefault();
    if (this.plantId !== null) {
      this.testGetData(this.plantId);
    }
  }

  testGetData(id: number) { // Funcion para obtener los datos de la planta que se ocupa en el input
    this.apiService.getData(id).subscribe(
      data => {
        this.getDataResponse = data;
        console.log('GET Data:', this.getDataResponse);
      },
      error => {
        console.error('Error:', error);
      }
    );
  }

  loadSpeciesList() { // Funcion para cargar la lista de plantas
    if (this.cache[this.page]) {
      this.speciesList = this.cache[this.page]; // Puse el cache mal, no pude comprobar si funcionaba pero era más que nada para no sobrecargar las solicitudes
      console.log('Lista de especies del cache:', this.speciesList);
    } else {
      // Se suponia que sii los datos no están en la cache realiza la solicitud a la API pero no funciono
      this.apiService.getSpeciesList(this.page).subscribe(
        data => {
          console.log('API Response:', data);
          if (Array.isArray(data.data)) {
            // Filtra solo los elementos que sean de tipo 'plant', tampoco lo pude comprobar, si da error solamente quiten el filtro para que envie por orden de id
            this.speciesList = data.data.filter((item: Species) => item.type === 'plant').slice(0, 10);
            this.cache[this.page] = this.speciesList; // Almacena los datos en la caché
            console.log('Lista de especies filtradas:', this.speciesList);
          } else {
            console.error('Error: data.data no esta en el array');
          }
        },
        error => {
          console.error('Error:', error);
        }
      );
    }
  }
  
  // solo cambia de pagina y el de abajo tambien
  nextPage() {
    if (this.page < this.totalPages) {
      this.page++;
      this.loadSpeciesList();
    }
  }

  prevPage() {
    if (this.page > 1) {
      this.page--;
      this.loadSpeciesList();
    }
  }
}