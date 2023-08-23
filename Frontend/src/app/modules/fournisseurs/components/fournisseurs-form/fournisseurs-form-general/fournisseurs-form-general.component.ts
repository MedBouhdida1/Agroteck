import { Component, OnInit, Input } from "@angular/core";
import { Fournisseur } from "../../../models/fournisseur.model";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { SharedService } from "app/modules/company/services/shared.service";

@Component({
  selector: "app-fournisseurs-form-general",
  templateUrl: "./fournisseurs-form-general.component.html",
  styleUrls: ["./fournisseurs-form-general.component.scss"],
})
export class FournisseursFormGeneralComponent implements OnInit {
  @Input() fournisseur!: Fournisseur;

  addform: FormGroup;

  constructor(private sharedService: SharedService) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.addform = new FormGroup({
      code: new FormControl("", [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(10),
      ]),
      name: new FormControl("", [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(8),
      ]),
      type: new FormControl("", [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(8),
      ]),
      paymentTerm: new FormControl("", [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(8),
      ]),
      currency: new FormControl("", [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(8),
      ]),
    });
    console.log("====================================");
    console.log(" add form :", this.addform);
    console.log("====================================");
  }

  geValues(event) {
    console.log("====================================");
    console.log("event :", event);
    console.log("====================================");

    console.log("====================================");
    console.log("le formulaire :", this.addform);
    console.log("====================================");

    this.sharedService.setIsActive(true);
  }

  get f() {
    return this.addform.controls;
  }

  // isControlValid(controlCode: string): boolean {
  //   const control = this.addform.controls[controlCode];
  //   return control.invalid && (control.dirty || control.touched);
  // }

  // isControlInValid(controlName: string): boolean {
  //   const control = this.addform.controls[controlName];
  //   return control.invalid && (control.dirty || control.touched);
  // }
}
