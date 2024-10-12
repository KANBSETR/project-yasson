import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModificarRolesPage } from './modificar-roles.page';

describe('ModificarRolesPage', () => {
  let component: ModificarRolesPage;
  let fixture: ComponentFixture<ModificarRolesPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ModificarRolesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
