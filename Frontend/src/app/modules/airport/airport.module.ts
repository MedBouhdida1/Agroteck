import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AirportRoutingModule } from './airport-routing.module';
import { AirportListComponent } from './components/airport-list/airport-list.component';
import { AirportFormComponent } from './components/airport-form/airport-form.component';
import { airport } from './models/airport.model';
import { airportService } from './Services/airport.service';
import { SharedModule } from 'app/shared/shared.module';
import { AirportFormGeneralComponent } from './components/airport-form/airport-form-general/airport-form-general.component';
import { AirportNotesComponent } from './components/airport-form/airport-notes/airport-notes.component';
import { TrashComponent } from './components/trash/trash.component';


@NgModule({
  declarations: [
    AirportListComponent,
    AirportFormComponent,
    AirportFormGeneralComponent,
    AirportNotesComponent,
    TrashComponent,
  ],
  imports: [
    CommonModule,
    AirportRoutingModule,
    SharedModule
  ],
  providers: [airportService]
})

export class AirportModule { }
