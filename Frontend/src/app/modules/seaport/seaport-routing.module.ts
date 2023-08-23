import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SeaportListComponent } from './components/seaport-list/seaport-list.component';
import { TrashComponent } from './components/trash/trash.component';

const routes: Routes = [
  {
    path: '',
    component: SeaportListComponent
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
export class SeaportRoutingModule { }
