import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CompraRealizadaPage } from './compra-realizada.page';

describe('CompraRealizadaPage', () => {
  let component: CompraRealizadaPage;
  let fixture: ComponentFixture<CompraRealizadaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CompraRealizadaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
