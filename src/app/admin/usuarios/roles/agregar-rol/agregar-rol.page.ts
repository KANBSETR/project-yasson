import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-agregar-rol',
  templateUrl: './agregar-rol.page.html',
  styleUrls: ['./agregar-rol.page.scss'],
})
export class AgregarRolPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  async presentAlert() {
    Swal.fire({
      title: 'Rol agregado correctamente',
      icon: 'success',
      timer: 2000,
      position: 'top',
      showConfirmButton: false,
      toast: true
    });
  }
}
