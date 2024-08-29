import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AgregarRolPage } from './agregar-rol.page';

describe('AgregarRolPage', () => {
  let component: AgregarRolPage;
  let fixture: ComponentFixture<AgregarRolPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AgregarRolPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
