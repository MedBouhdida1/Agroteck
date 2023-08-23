import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HotToastService } from '@ngneat/hot-toast';
import { TranslateService } from '@ngx-translate/core';
import { airport } from 'app/modules/airport/models/airport.model';
import { SharedService } from 'app/modules/company/services/shared.service';

@Component({
  selector: 'app-airport-form-general',
  templateUrl: './airport-form-general.component.html',
  styleUrls: ['./airport-form-general.component.scss']
})
export class AirportFormGeneralComponent implements OnInit {

  @Input() airport!: airport;

  addform: FormGroup;

  constructor(private sharedService: SharedService) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {

    this.addform = new FormGroup({
      code: new FormControl("", [
        Validators.required,
        Validators.maxLength(50),
        Validators.pattern(/^[+]?\d+(\.\d+)?$/)
      ]),
      name: new FormControl("", [
        Validators.required,
        Validators.maxLength(50),
      ])
    });
    console.log("====================================");
    console.log(" add form :", this.addform);
    console.log("====================================");
  }
  get code() { return this.addform.get('code') }
  get name() { return this.addform.get('name') }

  geValues(event) {
    this.sharedService.setIsActive(false);
    console.log("====================================");
    console.log("event :", event);
    console.log("====================================");

    console.log("====================================");
    console.log("le formulaire :", this.addform);
    console.log("====================================");
    if (this.addform.valid) {
      this.sharedService.setIsActive(true);
    }
  }

  get f() {
    return this.addform.controls;
  }


}
