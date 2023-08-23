import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductCategoryFormGeneralComponent } from './product-category-form-general.component';

describe('ProductCategoryFormGeneralComponent', () => {
  let component: ProductCategoryFormGeneralComponent;
  let fixture: ComponentFixture<ProductCategoryFormGeneralComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductCategoryFormGeneralComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductCategoryFormGeneralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
