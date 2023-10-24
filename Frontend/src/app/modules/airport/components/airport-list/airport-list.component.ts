import { Component, Inject, OnInit, ViewChild } from "@angular/core";
import { airport } from "../../models/airport.model";
import { airportService } from "../../Services/airport.service";
import { ConfirmDialogComponent } from "app/shared/components/confirm-dialog/confirm-dialog.component";
import { WizardDialogComponent } from "app/shared/components/wizard-dialog/wizard-dialog.component";
import { DialogComponent } from "@progress/kendo-angular-dialog";
import { StepperComponent } from "app/shared/components/stepper/stepper.component";
import { TranslateService } from "@ngx-translate/core";
import { HotToastService } from "@ngneat/hot-toast";

@Component({
  selector: "app-airport-list",
  templateUrl: "./airport-list.component.html",
  styleUrls: ["./airport-list.component.scss"],
})
export class AirportListComponent implements OnInit {
  @ViewChild("deleteModal")
  deleteModal!: ConfirmDialogComponent;

  @ViewChild("deletPermaModal")
  deletePermaModal!: ConfirmDialogComponent;

  @ViewChild("formModal")
  formModal!: WizardDialogComponent;

  @ViewChild("importModal")
  importModal!: DialogComponent;
  @ViewChild("stepper")
  stepper!: StepperComponent;

  currentStep = 0;
  steps: any = [
    "steps.general",
    "steps.information",

  ];

  loading = false;
  airport: airport = {};
  // fournisseursPage: Page<Fournisseur> = initPage;

  filter = "";
  airports: Array<airport> = [];
  airportName: string = "";
  nbrAirports = 0;
  page: number = 1;
  constructor(
    private service: airportService,
    private translateService: TranslateService,
    private toastService: HotToastService,
  ) { }
  onCancel() {
    this.airport = {};
    this.currentStep = 0;
  }

  onSave(id: string | null) {
    this.toastService.loading(
      this.translateService.instant("message.loading..."),
      { id: "0" }
    );
    //control required fiels
    // if (this.airport.airportCode == null || this.airport.airportCode == "" || this.airport.airportName == null || this.airport.airportName == "") {
    //   this.toastService.close("0");
    //   this.toastService.error(
    //     this.translateService.instant("errors.required", {
    //       elem: this.translateService.instant("airport"),
    //     })
    //   );
    //   return;
    // }
    this.service.save(id, this.airport!).subscribe({
      next: () => {
        this.getActiveAirports();
        this.formModal.hide();
        this.onCancel();
        this.toastService.close("0");
        this.toastService.success(
          this.translateService.instant("success.saved", {
            elem: this.translateService.instant("airport"),
          })
        );
      },
      error: (error) => {
        this.toastService.close("0");
        this.toastService.error(
          this.translateService.instant(error.error, {
            elem: this.translateService.instant("airport"),
          })
        );
      },
    });
  }
  onWizardSave(id: string | null) {
    if (this.stepper.lastStep()) {
      this.onSave(id);
      return;
    }
    this.stepper.nextStep();
  }
  onClickAdd() {
    this.formModal.show({
      title: "menu.add-airport",
      stepsCount: this.steps.length - 1,
      confirm: () => this.onWizardSave(null),
      cancel: () => this.onCancel(),
      prev: () => this.stepper.prevStep(),
    });
  }

  onclickDeletePerma(id: string) {
    this.deletePermaModal.show(() => {
      this.toastService.loading(
        this.translateService.instant("message.loading..."),
        {
          id: "0",
        }
      );
      this.service.delete(id).subscribe({
        next: () => {
          this.getActiveAirports();
          this.deletePermaModal.hide();
          this.toastService.close("0");
          this.toastService.success(
            this.translateService.instant("success.deleted", {
              elem: this.translateService.instant("airport"),
            })
          );
        },
        error: (error) => {
          this.deleteModal.hide();
          this.toastService.close("0");
          this.toastService.error(
            this.translateService.instant(error.error, {
              elem: this.translateService.instant("airport"),
            })
          );
        },
      });
    });
  }
  onClickDelete(id: string) {
    this.deleteModal.show(() => {
      this.toastService.loading(
        this.translateService.instant("message.loading..."),
        {
          id: "0",
        }
      );
      this.service.deactivateAirport(id).subscribe({
        next: () => {
          this.getActiveAirports();
          this.deleteModal.hide();
          this.toastService.close("0");
          this.toastService.success(
            this.translateService.instant("success.deleted", {
              elem: this.translateService.instant("airport"),
            })
          );
        },
        error: (error) => {
          this.deleteModal.hide();
          this.toastService.close("0");
          this.toastService.error(
            this.translateService.instant(error.error, {
              elem: this.translateService.instant("airport"),
            })
          );
        },
      });
    });
  }
  onClickEdit(id: string) {
    this.findAirportById(id);
    this.formModal.show({
      title: "menu.edit-airport",
      stepsCount: this.steps.length - 1,
      confirm: () => this.onWizardSave(id),
      cancel: () => this.onCancel(),
      prev: () => this.stepper.prevStep(),
    });
  }
  findAirportById(id: string) {
    this.service.findAirportById(id).subscribe({
      next: (result) => (this.airport = result),
      error: (error) => console.error(error),
    });
  }
  onStepChange(step: number) {
    this.currentStep = step;
  }

  searchByAirportName() {
    this.service.searchAirportByNameActive(this.airportName).subscribe({
      next: (result) => {
        this.airports = result;
        console.log(this.airports);
      },
      error: (error) => console.error(error),
    });
  }

  ngOnInit(): void {
    this.getActiveAirports();
  }

  getActiveAirports() {
    this.loading = true;
    this.service.getActiveAirports().subscribe({
      next: (result) => {
        this.airports = result;
        this.nbrAirports = this.airports.length;
        console.log(this.airports);
      },
      error: (error) => {
        this.loading = false;
        console.error(error);
      },
      complete: () => (this.loading = false),
    });
  }

  sortByAirportCodeValid: boolean = true;
  AirportCode() {
    if (this.sortByAirportCodeValid) {
      this.airports.sort((a, b) => a.airportCode.localeCompare(b.airportCode));
      this.sortByAirportCodeValid = false;
    } else {
      this.airports.sort((a, b) => b.airportCode.localeCompare(a.airportCode));
      this.sortByAirportCodeValid = true;
    }
  }

  sortByAirportNameValid: boolean = true;
  sortByAirportName() {
    if (this.sortByAirportNameValid) {
      this.airports.sort((a, b) => a.airportName.localeCompare(b.airportName));
      this.sortByAirportNameValid = false;
    } else {
      this.airports.sort((a, b) => b.airportName.localeCompare(a.airportName));
      this.sortByAirportNameValid = true;
    }
  }
  sortByNotesValid: boolean = true;
  sortByNotes() {
    if (this.sortByNotesValid) {
      this.airports.sort((a, b) => a.notes.localeCompare(b.notes));
      this.sortByNotesValid = false;
    } else {
      this.airports.sort((a, b) => b.notes.localeCompare(a.notes));
      this.sortByNotesValid = true;
    }
  }
}
