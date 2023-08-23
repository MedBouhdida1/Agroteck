import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AirportNotesComponent } from './airport-notes.component';

describe('AirportNotesComponent', () => {
  let component: AirportNotesComponent;
  let fixture: ComponentFixture<AirportNotesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AirportNotesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AirportNotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
