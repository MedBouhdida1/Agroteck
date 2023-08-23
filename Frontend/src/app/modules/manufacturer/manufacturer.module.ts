import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManufacturerRoutingModule } from './manufacturer-routing.module';
import { ManufacturerListComponent } from './components/manufacturer-list/manufacturer-list.component';
import { ManufacturerFormComponent } from './components/manufacturer-form/manufacturer-form.component';
import { TrashComponent } from './components/trash/trash.component';
import { ManufacturerFormGeneralComponent } from './components/manufacturer-form/manufacturer-form-general/manufacturer-form-general.component';
import { ManufacturerFormNotesComponent } from './components/manufacturer-form/manufacturer-notes/manufacturer-form-notes.component';
import { SharedModule } from 'app/shared/shared.module';


@NgModule({
  declarations: [
    ManufacturerListComponent,
    ManufacturerFormComponent,
    TrashComponent,
    ManufacturerFormGeneralComponent,
    ManufacturerFormNotesComponent
  ],
  imports: [
    CommonModule,
    ManufacturerRoutingModule,
    SharedModule
  ]
})
export class ManufacturerModule { }
