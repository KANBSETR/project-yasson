import { Component, AfterViewInit, OnDestroy } from '@angular/core';
import { addIcons } from 'ionicons';
import { chevronForward, listCircle } from 'ionicons/icons';
import { Chart, registerables } from 'chart.js';

@Component({
  selector: 'app-admin',
  templateUrl: 'admin.page.html',
  styleUrls: ['admin.page.scss'],
})
export class HomePage implements AfterViewInit, OnDestroy {
  username = 'admin'; // Cambiar con el usuario logueado
  selectedSegment: string = 'usuarios';
  userChart: Chart<'doughnut'> | undefined; //Propiedad, tipo de dato y valor inicial
  salesChart: Chart<'doughnut'> | undefined;
  productChart: Chart<'doughnut'> | undefined;

  constructor() {
    addIcons({ chevronForward, listCircle });
    Chart.register(...registerables); // Le dice a la biblioteca Chart.js que use todos los componentes necesarios (como tipos de gráficos, escalas, leyendas, etc.) que están en la lista llamada registerables.
  }

  ngAfterViewInit() { //Este método se llama despues de que la vista se haya inicializado y llama a this.updateChart() para crear el gráfico
    this.updateChart();
  }

  ngOnDestroy() { // Este método se llama cuando el componente se destruye y llama a this.destroyCharts() para destruir los gráficos
    this.destroyCharts();
  }

  updateChart() {
    this.destroyCharts(); //Esta funcion limpia el grafico existente antes de crear uno nuevo
    setTimeout(() => {    // Espera a que el navegador termine de procesar el evento actual
      if (this.selectedSegment === 'usuarios') { //Si el segmento seleccionado es 'usuarios' se llama a la funcion createUserStatsChart()
        this.createUserStatsChart();
      } else if (this.selectedSegment === 'ventas') { //Si el segmento seleccionado es 'ventas' se llama a la funcion createSalesStatsChart()
        this.createSalesStatsChart();
      } else if (this.selectedSegment === 'productos') { //Si el segmento seleccionado es 'productos' se llama a la funcion createProductStatsChart()
        this.createProductStatsChart();
      }
    }, 0);
  }

  destroyCharts() {
    if (this.userChart) {
      this.userChart.destroy(); //Si existe, destruye el gráfico de usuarios
      this.userChart = undefined;
    }
    if (this.salesChart) {
      this.salesChart.destroy(); //Si existe, destruye el gráfico de ventas
      this.salesChart = undefined;
    }
    if (this.productChart) {
      this.productChart.destroy(); //Si existe, destruye el gráfico de productos
      this.productChart = undefined;
    }
  }

  createUserStatsChart() { //Funcion para crear el gráfico de usuarios de tipo "doughnut"
    const ctx = document.getElementById('userStats') as HTMLCanvasElement; //Obtiene el elemento con el id 'userStats' y lo guarda en la variable ctx
    if (ctx) {
      this.userChart = new Chart<'doughnut'>(ctx, { // Verifica si existe en el if anterior, si existe crea el gráfico y se la asigna la propiedad userChart
        type: 'doughnut',
        data: {
          labels: ['Activos', 'Inactivos'],
          datasets: [{
            data: [60, 40], //Datos estaticos
            backgroundColor: ['#36A2EB', '#FF6384'],
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: 'top',
            },
            tooltip: {
              enabled: true,
            },
          },
          layout: {
            padding: {
              left: 0,
              right: 0,
              top: 0,
              bottom: 0,
            },
          },
        }
      });
    }
  }

  createSalesStatsChart() {
    const ctx = document.getElementById('salesStats') as HTMLCanvasElement;
    if (ctx) {
      this.salesChart = new Chart<'doughnut'>(ctx, {
        type: 'doughnut',
        data: {
          labels: ['Completadas', 'Pendientes'],
          datasets: [{
            data: [75, 25],
            backgroundColor: ['#FFCE56', '#FF6384'],
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: 'top',
            },
            tooltip: {
              enabled: true,
            },
          },
          layout: {
            padding: {
              left: 0,
              right: 0,
              top: 0,
              bottom: 0,
            },
          },
        }
      });
    }
  }

  createProductStatsChart() {
    const ctx = document.getElementById('productStats') as HTMLCanvasElement;
    if (ctx) {
      this.productChart = new Chart<'doughnut'>(ctx, {
        type: 'doughnut',
        data: {
          labels: ['Disponibles', 'Agotados'],
          datasets: [{
            data: [80, 20],
            backgroundColor: ['#4BC0C0', '#FFCE56'],
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: 'top',
            },
            tooltip: {
              enabled: true,
            },
          },
          layout: {
            padding: {
              left: 0,
              right: 0,
              top: 0,
              bottom: 0,
            },
          },
        }
      });
    }
  }
}