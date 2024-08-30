import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-agregar-usuario',
  templateUrl: './agregar-usuario.page.html',
  styleUrls: ['./agregar-usuario.page.scss'],
})
export class AgregarUsuarioPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  async presentAlert() {
    Swal.fire({
      title: 'Usuario agregado correctamente',
      icon: 'success',
      timer: 2000,
      position: 'top',
      showConfirmButton: false,
      toast: true
    });
  }
}
