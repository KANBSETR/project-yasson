import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditarCategoriaPage } from './editar-categoria.page';

describe('EditarCategoriaPage', () => {
  let component: EditarCategoriaPage;
  let fixture: ComponentFixture<EditarCategoriaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarCategoriaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
