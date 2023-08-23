import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductCategoryRoutingModule } from './product-category-routing.module';
import { ProductCategoryListComponent } from './components/product-category-list/product-category-list.component';
import { TrashComponent } from './components/trash/trash.component';
import { ProductCategoryFormGeneralComponent } from './components/product-category-form/product-category-form-general/product-category-form-general.component';
import { ProductCategoryNotesComponent } from './components/product-category-form/product-category-notes/product-category-notes.component';
import { ProductCategoryFormComponent } from './components/product-category-form/product-category-form.component';
import { SharedModule } from 'app/shared/shared.module';


@NgModule({
  declarations: [
    ProductCategoryListComponent,
    TrashComponent,
    ProductCategoryFormGeneralComponent,
    ProductCategoryNotesComponent,
    ProductCategoryFormComponent
  ],
  imports: [
    CommonModule,
    ProductCategoryRoutingModule,
    SharedModule
  ]
})
export class ProductCategoryModule { }
