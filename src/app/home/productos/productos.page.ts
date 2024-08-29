import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.page.html',
  styleUrls: ['./productos.page.scss'],
})
export class ProductosPage implements OnInit {
  selectedDetail: number | null = null; // Almacena el ID del producto cuyo detalle está visible
  submenuOpen: { [key: string]: boolean } = {
    lacteos: false,
    carnes: false,
    bebidas: false,
    panaderia: false,
    frutas: false
  };

  constructor() { }

  ngOnInit() { }

  toggleDetails(productId: number) {
    if (this.selectedDetail === productId) {
      this.selectedDetail = null;  // Oculta los detalles si se vuelve a hacer clic en el mismo producto
    } else {
      this.selectedDetail = productId;  // Muestra los detalles del producto seleccionado
    }
  }

  toggleSubmenu(submenu: string) {
    this.submenuOpen[submenu] = !this.submenuOpen[submenu];  // Abre o cierra el submenú seleccionado
    if (!this.submenuOpen[submenu]) {
      this.selectedDetail = null;  // Oculta los detalles si el submenú se cierra
    }
  }
}
