import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditarPlantaPage } from './editar-planta.page';

describe('EditarPlantaPage', () => {
  let component: EditarPlantaPage;
  let fixture: ComponentFixture<EditarPlantaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarPlantaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
