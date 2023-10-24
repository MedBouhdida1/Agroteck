import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SeaportRoutingModule } from './seaport-routing.module';
import { SeaportFormComponent } from './components/seaport-form/seaport-form.component';
import { SeaportListComponent } from './components/seaport-list/seaport-list.component';
import { SharedModule } from 'app/shared/shared.module';
import { SeaportFormGeneralComponent } from './components/seaport-form/seaport-form-general/seaport-form-general.component';
import { SeaportInformationComponent } from './components/seaport-form/seaport-information/seaport-information.component';
import { TrashComponent } from './components/trash/trash.component';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  declarations: [
    SeaportFormComponent,
    SeaportListComponent,
    SeaportFormGeneralComponent,
    SeaportInformationComponent,
    TrashComponent,
  ],
  imports: [
    CommonModule,
    SeaportRoutingModule,
    SharedModule,
    NgxPaginationModule
  ]
})
export class SeaportModule { }
