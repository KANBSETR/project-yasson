import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.page.html',
  styleUrls: ['./pedidos.page.scss'],
})
export class PedidosPage implements OnInit {

  pedidos = [
    { fecha: '2024-09-01', cliente: 'Juan Pérez', estado: 'Enviado', total: 25.50 },
    { fecha: '2024-09-02', cliente: 'María Gómez', estado: 'Pendiente', total: 15.75 },
  ];

  constructor() { 
  }

  ngOnInit() {
  }

}
