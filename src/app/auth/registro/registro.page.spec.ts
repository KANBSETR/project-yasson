import { ComponentFixture, TestBed } from '@angular/core/testing';
import {RegistroPage} from './registro.page';;  // Asegúrate de importar tu componente
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';

describe('Registro', () => {
  let component: RegistroPage;
  let fixture: ComponentFixture<RegistroPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistroPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('La página se crea correctamente', () => {
    expect(component).toBeTruthy();
  });

  it('La página se crea correctamente', () => {
    expect(component).toBeTruthy();
  });

  it('El formulario debe ser inválido cuando está vacío', () => {
    expect(component.formularioRegistro.valid).toBeFalsy();
  });

  it('El formulario debe ser válido cuando se rellenan los campos', () => {
    component.formularioRegistro.controls['nombre'].setValue('Nombre de prueba');
    component.formularioRegistro.controls['password'].setValue('123456');
    component.formularioRegistro.controls['confirmacionPassword'].setValue('123456');
    expect(component.formularioRegistro.valid).toBeTruthy();
  });

  it('El formulario debe ser inválido cuando las contraseñas no coinciden', () => {
    component.formularioRegistro.controls['nombre'].setValue('Nombre de prueba');
    component.formularioRegistro.controls['password'].setValue('123456');
    component.formularioRegistro.controls['confirmacionPassword'].setValue('123457');
    expect(component.formularioRegistro.valid).toBeFalsy();
  });

  it('El método guardar debe imprimir los datos del formulario', () => {
    const consoleSpy = spyOn(console, 'log');
    component.formularioRegistro.controls['nombre'].setValue('Nombre de prueba');
    component.formularioRegistro.controls['password'].setValue('123456');
    component.formularioRegistro.controls['confirmacionPassword'].setValue('123456');
    component.guardar();
    expect(consoleSpy).toHaveBeenCalledTimes(2);
  });


  it('El método guardar debe imprimir un mensaje si el formulario no es válido', () => {
    const consoleSpy = spyOn(console, 'log');
    component.guardar();
    expect(consoleSpy).toHaveBeenCalledWith('El formulario no es válido');
  });

  it('El método guardar debe imprimir un mensaje si el formulario no es válido', () => {
    const consoleSpy = spyOn(console, 'log');
    component.guardar();
    expect(consoleSpy).toHaveBeenCalledWith('El formulario no es válido');
  });

  it('El método guardar debe imprimir un mensaje si el formulario no es válido', () => {
    const consoleSpy = spyOn(console, 'log');
    component.guardar();
    expect(consoleSpy).toHaveBeenCalledWith('El formulario no es válido');
  });

  it('El método guardar debe imprimir un mensaje si el formulario no es válido', () => {
    const consoleSpy = spyOn(console, 'log');
    component.guardar();
    expect(consoleSpy).toHaveBeenCalledWith('El formulario no es válido');
  });

  it('El formulario debe ser inválido cuando las contraseñas no coinciden', () => {
    component.formularioRegistro.controls['nombre'].setValue('Nombre de prueba');
    component.formularioRegistro.controls['password'].setValue('123456');
    component.formularioRegistro.controls['confirmacionPassword'].setValue('123457');
    expect(component.formularioRegistro.valid).toBeFalsy();
  });
  it('El formulario debe ser inválido cuando las contraseñas no coinciden', () => {
    component.formularioRegistro.controls['nombre'].setValue('Nombre de prueba');
    component.formularioRegistro.controls['password'].setValue('123456');
    component.formularioRegistro.controls['confirmacionPassword'].setValue('123457');
    expect(component.formularioRegistro.valid).toBeFalsy();
  });
  it('El formulario debe ser inválido cuando las contraseñas no coinciden', () => {
    component.formularioRegistro.controls['nombre'].setValue('Nombre de prueba');
    component.formularioRegistro.controls['password'].setValue('123456');
    component.formularioRegistro.controls['confirmacionPassword'].setValue('123457');
    expect(component.formularioRegistro.valid).toBeFalsy();
  });
  it('El formulario debe ser inválido cuando las contraseñas no coinciden', () => {
    component.formularioRegistro.controls['nombre'].setValue('Nombre de prueba');
    component.formularioRegistro.controls['password'].setValue('123456');
    component.formularioRegistro.controls['confirmacionPassword'].setValue('123457');
    expect(component.formularioRegistro.valid).toBeFalsy();
  });

  it('El formulario debe ser inválido cuando las contraseñas no coinciden', () => {
    component.formularioRegistro.controls['nombre'].setValue('Nombre de prueba');
    component.formularioRegistro.controls['password'].setValue('123456');
    component.formularioRegistro.controls['confirmacionPassword'].setValue('123457');
    expect(component.formularioRegistro.valid).toBeFalsy();
  });
  it('El formulario debe ser inválido cuando las contraseñas no coinciden', () => {
    component.formularioRegistro.controls['nombre'].setValue('Nombre de prueba');
    component.formularioRegistro.controls['password'].setValue('123456');
    component.formularioRegistro.controls['confirmacionPassword'].setValue('123457');
    expect(component.formularioRegistro.valid).toBeFalsy();
  });
  it('El formulario debe ser inválido cuando las contraseñas no coinciden', () => {
    component.formularioRegistro.controls['nombre'].setValue('Nombre de prueba');
    component.formularioRegistro.controls['password'].setValue('123456');
    component.formularioRegistro.controls['confirmacionPassword'].setValue('123457');
    expect(component.formularioRegistro.valid).toBeFalsy();
  });
  it('El formulario debe ser inválido cuando las contraseñas no coinciden', () => {
    component.formularioRegistro.controls['nombre'].setValue('Nombre de prueba');
    component.formularioRegistro.controls['password'].setValue('123456');
    component.formularioRegistro.controls['confirmacionPassword'].setValue('123457');
    expect(component.formularioRegistro.valid).toBeFalsy();
  });
  it('El formulario debe ser inválido cuando las contraseñas no coinciden', () => {
    component.formularioRegistro.controls['nombre'].setValue('Nombre de prueba');
    component.formularioRegistro.controls['password'].setValue('123456');
    component.formularioRegistro.controls['confirmacionPassword'].setValue('123457');
    expect(component.formularioRegistro.valid).toBeFalsy();
  });
  it('El formulario debe ser inválido cuando las contraseñas no coinciden', () => {
    component.formularioRegistro.controls['nombre'].setValue('Nombre de prueba');
    component.formularioRegistro.controls['password'].setValue('123456');
    component.formularioRegistro.controls['confirmacionPassword'].setValue('123457');
    expect(component.formularioRegistro.valid).toBeFalsy();
  });
  it('El formulario debe ser inválido cuando las contraseñas no coinciden', () => {
    component.formularioRegistro.controls['nombre'].setValue('Nombre de prueba');
    component.formularioRegistro.controls['password'].setValue('123456');
    component.formularioRegistro.controls['confirmacionPassword'].setValue('123457');
    expect(component.formularioRegistro.valid).toBeFalsy();
  });
  it('El formulario debe ser inválido cuando las contraseñas no coinciden', () => {
    component.formularioRegistro.controls['nombre'].setValue('Nombre de prueba');
    component.formularioRegistro.controls['password'].setValue('123456');
    component.formularioRegistro.controls['confirmacionPassword'].setValue('123457');
    expect(component.formularioRegistro.valid).toBeFalsy();
  });

});
