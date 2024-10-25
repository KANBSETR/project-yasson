import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.page.html',
  styleUrls: ['./productos.page.scss'],
})
export class ProductosPage implements OnInit {
  products: any[] = [];
  categories: any[] = [];
  expandedProductId: string | null = null;
  activeCategoryId: string | null = null;
  cart: any[] = []; // Propiedad para el carrito

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadCategories();
    this.loadProducts();
  }

  loadProducts() {
    this.http.get<any[]>('http://localhost:3000/plantas').subscribe((data) => {
      this.products = data;
    });
  }

  loadCategories() {
    this.http.get<any[]>('http://localhost:3000/categorias').subscribe((data) => {
      this.categories = data;
      this.activeCategoryId = this.categories.length > 0 ? this.categories[0].id : null;
    });
  }

  toggleDetails(productId: string) {
    this.expandedProductId = this.expandedProductId === productId ? null : productId;
  }

  addToCart(product: any) {
    this.cart.push(product);
    localStorage.setItem('cart', JSON.stringify(this.cart)); // Guardar en el almacenamiento local
    console.log('Producto agregado al carrito:', product);
  }
  
}
