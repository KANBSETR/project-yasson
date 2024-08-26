import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AgregarPlantaPage } from './agregar-planta.page';

describe('AgregarPlantaPage', () => {
  let component: AgregarPlantaPage;
  let fixture: ComponentFixture<AgregarPlantaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AgregarPlantaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
