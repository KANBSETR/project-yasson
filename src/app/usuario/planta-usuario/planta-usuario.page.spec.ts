import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PlantaUsuarioPage } from './planta-usuario.page';

describe('PlantaUsuarioPage', () => {
  let component: PlantaUsuarioPage;
  let fixture: ComponentFixture<PlantaUsuarioPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PlantaUsuarioPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
