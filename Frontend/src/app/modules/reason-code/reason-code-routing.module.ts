import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReasonListComponent } from './components/reason-list/reason-list.component';
import { TrashComponent } from './components/trash/trash.component';

const routes: Routes = [
  {
    path: '',
    component: ReasonListComponent
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
export class ReasonCodeRoutingModule { }
