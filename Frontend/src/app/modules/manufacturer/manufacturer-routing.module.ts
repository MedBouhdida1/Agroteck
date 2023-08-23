import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManufacturerListComponent } from './components/manufacturer-list/manufacturer-list.component';
import { TrashComponent } from './components/trash/trash.component';

const routes: Routes = [

  {
    path: '',
    component: ManufacturerListComponent
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
export class ManufacturerRoutingModule { }
