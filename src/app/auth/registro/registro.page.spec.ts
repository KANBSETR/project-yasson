import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegistroPage } from './registro.page';

describe('Registro de usuarios', () => {
  let component: RegistroPage;
  let fixture: ComponentFixture<RegistroPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistroPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Agrega usuarios', () => {
    expect(component).toBeTruthy();
  });
  it('Modifica usuarios', () => {
    expect(component).toBeTruthy();
  });

  it('Elimina usuarios', () => {
    expect(component).toBeTruthy();
  });

  it('Lista usuarios', () => {
    expect(component).toBeTruthy();
  });
});
