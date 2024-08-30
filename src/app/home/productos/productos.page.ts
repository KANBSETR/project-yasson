import { Component } from '@angular/core';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.page.html',
  styleUrls: ['./productos.page.scss'],
})
export class ProductosPage {
  selectedCategory: string = 'all';
  selectedDetail: number | null = null;

  constructor() {}

  toggleDetails(detailId: number) {
    this.selectedDetail = this.selectedDetail === detailId ? null : detailId;
  }
}
