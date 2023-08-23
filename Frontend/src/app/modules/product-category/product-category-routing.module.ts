import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { productCategory } from './Models/productCategory.model';
import { ProductCategoryListComponent } from './components/product-category-list/product-category-list.component';
import { TrashComponent } from './components/trash/trash.component';

const routes: Routes = [

  {
    path: '',
    component: ProductCategoryListComponent
  },
  {
    path: 'trash',
    component: TrashComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductCategoryRoutingModule { }
