import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ArduinoPage } from './arduino.page';

describe('ArduinoPage', () => {
  let component: ArduinoPage;
  let fixture: ComponentFixture<ArduinoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ArduinoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
