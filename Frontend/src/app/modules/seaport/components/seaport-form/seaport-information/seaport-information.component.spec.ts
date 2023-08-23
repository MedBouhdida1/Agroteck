import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeaportInformationComponent } from './seaport-information.component';

describe('SeaportInformationComponent', () => {
  let component: SeaportInformationComponent;
  let fixture: ComponentFixture<SeaportInformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SeaportInformationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SeaportInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
