import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VisualizarPage } from './visualizar.page';

describe('VisualizarPage', () => {
  let component: VisualizarPage;
  let fixture: ComponentFixture<VisualizarPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(VisualizarPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
