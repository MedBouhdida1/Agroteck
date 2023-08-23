import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReasonFormGeneralComponent } from './reason-form-general.component';

describe('ReasonFormGeneralComponent', () => {
  let component: ReasonFormGeneralComponent;
  let fixture: ComponentFixture<ReasonFormGeneralComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReasonFormGeneralComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReasonFormGeneralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
