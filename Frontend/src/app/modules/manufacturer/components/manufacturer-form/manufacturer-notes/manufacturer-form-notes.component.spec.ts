import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManufacturerFormNotesComponent } from './manufacturer-form-notes.component';

describe('ManufacturerFormNotesComponent', () => {
  let component: ManufacturerFormNotesComponent;
  let fixture: ComponentFixture<ManufacturerFormNotesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManufacturerFormNotesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManufacturerFormNotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
