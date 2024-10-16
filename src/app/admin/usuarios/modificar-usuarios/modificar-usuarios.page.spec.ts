import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModificarUsuariosPage } from './modificar-usuarios.page';

describe('ModificarUsuariosPage', () => {
  let component: ModificarUsuariosPage;
  let fixture: ComponentFixture<ModificarUsuariosPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ModificarUsuariosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
