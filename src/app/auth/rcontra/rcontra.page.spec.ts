import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RcontraPage } from './rcontra.page';

describe('RcontraPage', () => {
  let component: RcontraPage;
  let fixture: ComponentFixture<RcontraPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(RcontraPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
