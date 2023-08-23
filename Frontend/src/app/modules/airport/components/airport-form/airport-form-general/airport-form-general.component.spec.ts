import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AirportFormGeneralComponent } from './airport-form-general.component';

describe('AirportFormGeneralComponent', () => {
  let component: AirportFormGeneralComponent;
  let fixture: ComponentFixture<AirportFormGeneralComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AirportFormGeneralComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AirportFormGeneralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
