import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SharedService } from 'app/modules/company/services/shared.service';
import { productCategory } from 'app/modules/product-category/Models/productCategory.model';

@Component({
  selector: 'app-product-category-form-general',
  templateUrl: './product-category-form-general.component.html',
  styleUrls: ['./product-category-form-general.component.scss']
})
export class ProductCategoryFormGeneralComponent implements OnInit {

  @Input() productCategory!: productCategory;

  addform: FormGroup;

  constructor(private sharedService: SharedService) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {

    this.addform = new FormGroup({
      code: new FormControl("", [
        Validators.required,
        Validators.maxLength(50),
        Validators.pattern(/^[+]?\d+(\.\d+)?$/)
      ]),
      name: new FormControl("", [
        Validators.required,
        Validators.maxLength(50),
      ]),
      type: new FormControl("", [
        Validators.required,
        Validators.maxLength(50),
      ])
    });
    console.log("====================================");
    console.log(" add form :", this.addform);
    console.log("====================================");
  }
  get code() { return this.addform.get('code') }
  get name() { return this.addform.get('name') }
  get type() { return this.addform.get('type') }

  geValues(event) {
    this.sharedService.setIsActive(false);
    console.log("====================================");
    console.log("event :", event);
    console.log("====================================");

    console.log("====================================");
    console.log("le formulaire :", this.addform);
    console.log("====================================");
    if (this.addform.valid) {
      this.sharedService.setIsActive(true);
    }
  }

  get f() {
    return this.addform.controls;
  }

}
