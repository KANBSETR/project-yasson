import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.page.html',
  styleUrls: ['./pedidos.page.scss'],
})
export class PedidosPage implements OnInit {

  pedidos = [
    {
      id: 1,
      fecha: '2020-08-01',
      total: 100,
      estado: 'pendiente',
      usuario: {
        id: 1,
        nombre: 'Juan',
        apellido: 'Perez'
      }
    },
    {
      id: 2,
      fecha: '2020-08-02',
      total: 200,
      estado: 'entregado',
      usuario: {
        id: 2,
        nombre: 'Maria',
        apellido: 'Gomez'
      }
    },];
  constructor() { 
  }

  ngOnInit() {
  }

}
