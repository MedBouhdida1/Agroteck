import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeaportFormGeneralComponent } from './seaport-form-general.component';

describe('SeaportFormGeneralComponent', () => {
  let component: SeaportFormGeneralComponent;
  let fixture: ComponentFixture<SeaportFormGeneralComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SeaportFormGeneralComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SeaportFormGeneralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
