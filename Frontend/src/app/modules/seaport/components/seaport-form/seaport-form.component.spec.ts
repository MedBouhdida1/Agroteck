import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeaportFormComponent } from './seaport-form.component';

describe('SeaportFormComponent', () => {
  let component: SeaportFormComponent;
  let fixture: ComponentFixture<SeaportFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SeaportFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SeaportFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
