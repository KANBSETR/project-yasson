import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  formularioLogin: FormGroup;

  constructor(private fb: FormBuilder) {
    // Inicialización del formulario
    this.formularioLogin = this.fb.group({
      'Nombre': new FormControl("", Validators.required),
      'password': new FormControl("", Validators.required)
    });
  }

  ngOnInit() {
  }

  // Método que se llama al hacer clic en el botón Ingresar
  ingresar() {
    if (this.formularioLogin.valid) {
      const formData = this.formularioLogin.value;
      console.log('Nombre:', formData.Nombre);
      console.log('Contraseña:', formData.password);
      // Aquí puedes añadir la lógica para el inicio de sesión
    } else {
      console.log('El formulario no es válido');
    }
    window.location.href = '/admin';
  }
}
