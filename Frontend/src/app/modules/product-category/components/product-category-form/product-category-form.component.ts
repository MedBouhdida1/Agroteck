import { Component, Input, OnInit } from '@angular/core';
import { productCategory } from '../../Models/productCategory.model';

@Component({
  selector: 'app-product-category-form',
  templateUrl: './product-category-form.component.html',
  styleUrls: ['./product-category-form.component.scss']
})
export class ProductCategoryFormComponent implements OnInit {

  @Input() productCategory!: productCategory
  @Input() currentStep!: number

  constructor() { }

  ngOnInit(): void {
  }

}
