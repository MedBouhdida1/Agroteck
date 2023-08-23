import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManufacturerFormGeneralComponent } from './manufacturer-form-general.component';

describe('ManufacturerFormGeneralComponent', () => {
  let component: ManufacturerFormGeneralComponent;
  let fixture: ComponentFixture<ManufacturerFormGeneralComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManufacturerFormGeneralComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManufacturerFormGeneralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
