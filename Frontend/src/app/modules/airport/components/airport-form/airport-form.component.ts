import { Component, Input, OnInit } from '@angular/core';
import { airport } from '../../models/airport.model';

@Component({
  selector: 'app-airport-form',
  templateUrl: './airport-form.component.html',
  styleUrls: ['./airport-form.component.scss']
})
export class AirportFormComponent implements OnInit {

  @Input() airport!: airport
  @Input() currentStep!: number

  constructor() { }

  ngOnInit(): void {
  }

}
