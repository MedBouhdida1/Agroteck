import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReasonCodeRoutingModule } from './reason-code-routing.module';
import { ReasonListComponent } from './components/reason-list/reason-list.component';
import { ReasonFormGeneralComponent } from './components/reason-form/reason-form-general/reason-form-general.component';
import { ReasonFormComponent } from './components/reason-form/reason-form.component';
import { ReasonInformationComponent } from './components/reason-form/reason-information/reason-information.component';
import { SharedModule } from 'app/shared/shared.module';
import { TrashComponent } from './components/trash/trash.component';


@NgModule({
  declarations: [
    ReasonListComponent,
    ReasonFormGeneralComponent,
    ReasonFormComponent,
    ReasonInformationComponent,
    TrashComponent
  ],
  imports: [
    CommonModule,
    ReasonCodeRoutingModule,
    SharedModule
  ]
})
export class ReasonCodeModule { }
