import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductCategoryNotesComponent } from './product-category-notes.component';

describe('ProductCategoryNotesComponent', () => {
  let component: ProductCategoryNotesComponent;
  let fixture: ComponentFixture<ProductCategoryNotesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductCategoryNotesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductCategoryNotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
