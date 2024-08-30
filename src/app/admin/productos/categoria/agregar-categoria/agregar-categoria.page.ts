import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-agregar-categoria',
  templateUrl: './agregar-categoria.page.html',
  styleUrls: ['./agregar-categoria.page.scss'],
})
export class AgregarCategoriaPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  async presentAlert() {
    Swal.fire({
      title: 'Categoria agregada correctamente',
      icon: 'success',
      timer: 2000,
      position: 'top',
      showConfirmButton: false,
      toast: true
    });
  }

}
