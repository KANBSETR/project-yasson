import { Component, OnInit } from '@angular/core';

interface Product {
  id: string;
  nombrePlanta: string;
  precio: number;
  imagen: string;
  quantity?: number; // Puede ser opcional
}

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.page.html',
  styleUrls: ['./carrito.page.scss'],
})
export class CarritoPage implements OnInit {
  cart: Product[] = []; // Aquí se guardarán los productos del carrito

  constructor() {}

  ngOnInit() {
    this.loadCart();
  }

  loadCart() {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      this.cart = JSON.parse(storedCart).map((item: any) => ({
        ...item,
        precio: Number(item.precio), // Asegúrate de que el precio sea un número
        quantity: item.quantity || 1, // Asegúrate de inicializar quantity
      }));
    }
  }

  addToCart(product: Product) {
    const foundProduct = this.cart.find(item => item.id === product.id);
    if (foundProduct) {
      foundProduct.quantity!++; // Aumentar la cantidad, el operador '!' indica que quantity no es undefined
    } else {
      product.quantity = 1; // Inicializar la cantidad
      this.cart.push({
        ...product,
        quantity: 1 // Agregar cantidad en el momento de añadir al carrito
      });
    }
    localStorage.setItem('cart', JSON.stringify(this.cart)); // Actualiza el almacenamiento local
  }

  removeFromCart(productId: string) {
    this.cart = this.cart.filter(product => product.id !== productId);
    localStorage.setItem('cart', JSON.stringify(this.cart)); // Actualiza el almacenamiento local
  }

  increaseQuantity(product: Product) {
    product.quantity = (product.quantity || 0) + 1; // Asegúrate de inicializar quantity si es undefined
    localStorage.setItem('cart', JSON.stringify(this.cart)); // Actualiza el almacenamiento local
  }

  decreaseQuantity(product: Product) {
    if ((product.quantity || 0) > 1) {
      product.quantity!--; // Asegúrate de inicializar quantity si es undefined
    } else {
      this.removeFromCart(product.id);
    }
    localStorage.setItem('cart', JSON.stringify(this.cart)); // Actualiza el almacenamiento local
  }

  clearCart() {
    this.cart = [];
    localStorage.removeItem('cart'); // Elimina el carrito del almacenamiento local
  }

  getTotal() {
    return this.cart.reduce((total, product) => {
      return total + (Number(product.precio) * (product.quantity || 0));
    }, 0).toFixed(2);
  }  
}
