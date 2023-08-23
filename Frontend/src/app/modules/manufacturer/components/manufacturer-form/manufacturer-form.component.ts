import { Component, Input, OnInit } from '@angular/core';
import { manufacturer } from '../../Models/manufacturer.model';

@Component({
  selector: 'app-manufacturer-form',
  templateUrl: './manufacturer-form.component.html',
  styleUrls: ['./manufacturer-form.component.scss']
})
export class ManufacturerFormComponent implements OnInit {


  @Input() manufacturer!: manufacturer
  @Input() currentStep!: number

  constructor() { }

  ngOnInit(): void {
  }

}
