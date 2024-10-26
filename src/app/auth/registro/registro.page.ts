import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder
} from '@angular/forms';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

  formularioRegistro: FormGroup;
  
  constructor(public fb: FormBuilder) {
    this.formularioRegistro = this.fb.group({
      'nombre': new FormControl("", Validators.required),
      'password': new FormControl("", Validators.required),
      'confirmacionPassword': new FormControl("", Validators.required)
    });
  }

  ngOnInit() {
  }
  passwordsMatch(group: FormGroup): { [key: string]: boolean } | null {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmacionPassword')?.value;
    return password === confirmPassword ? null : { 'mismatch': true };
  }

  guardar() {
    console.log('Método guardar llamado');
    if (this.formularioRegistro.valid) {
      const formData = this.formularioRegistro.value;
      console.log('Nombre:', formData.nombre);
      console.log('Email:', formData.email);
      console.log('Password:', formData.password);
      // Aquí puedes añadir lógica para registrar al usuario
    } else {
      console.log('El formulario no es válido');
    }
  }
}