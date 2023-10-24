import { Component, OnInit, ViewChild } from '@angular/core';
import { HotToastService } from '@ngneat/hot-toast';
import { TranslateService } from '@ngx-translate/core';
import { DialogComponent } from '@progress/kendo-angular-dialog';
import { airportService } from 'app/modules/airport/Services/airport.service';
import { airport } from 'app/modules/airport/models/airport.model';
import { ConfirmDialogComponent } from 'app/shared/components/confirm-dialog/confirm-dialog.component';
import { StepperComponent } from 'app/shared/components/stepper/stepper.component';
import { WizardDialogComponent } from 'app/shared/components/wizard-dialog/wizard-dialog.component';
import { seaport } from '../../models/seaport.model';
import { seaportService } from '../../services/seaport.service';

@Component({
  selector: 'app-seaport-list',
  templateUrl: './seaport-list.component.html',
  styleUrls: ['./seaport-list.component.scss']
})
export class SeaportListComponent implements OnInit {

  @ViewChild("deleteModal")
  deleteModal!: ConfirmDialogComponent;

  @ViewChild("archiveModal")
  archiveModal!: ConfirmDialogComponent;

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
  seaport: seaport = {};
  // fournisseursPage: Page<Fournisseur> = initPage;
  page: number = 1;
  nbrSeaports = 0;

  filter = "";
  seaports: Array<seaport> = [];
  seaportName: string = '';



  constructor(
    private service: seaportService,
    private translateService: TranslateService,
    private toastService: HotToastService
  ) { }
  onCancel() {
    this.seaport = {};
    this.currentStep = 0;
  }

  onSave(id: string | null) {
    this.toastService.loading(
      this.translateService.instant("message.loading..."),
      { id: "0" }
    );
    this.service.save(id, this.seaport!).subscribe({
      next: () => {
        this.getActiveSeaports()
        this.formModal.hide();
        this.onCancel();
        this.toastService.close("0");
        this.toastService.success(
          this.translateService.instant("success.saved", {
            elem: this.translateService.instant("seaport"),
          })
        );
      },
      error: (error) => {
        this.toastService.close("0");
        this.toastService.error(
          this.translateService.instant(error.error, {
            elem: this.translateService.instant("seaport"),
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
      title: "menu.add-seaport",
      stepsCount: this.steps.length - 1,
      confirm: () => this.onWizardSave(null),
      cancel: () => this.onCancel(),
      prev: () => this.stepper.prevStep(),
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
      this.service.deactivateSeaport(id).subscribe({
        next: () => {
          this.getActiveSeaports();
          this.deleteModal.hide();
          this.toastService.close("0");
          this.toastService.success(
            this.translateService.instant("success.deleted", {
              elem: this.translateService.instant("seaport"),
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
    this.findSeaportById(id);
    this.formModal.show({
      title: "menu.edit-airport",
      stepsCount: this.steps.length - 1,
      confirm: () => this.onWizardSave(id),
      cancel: () => this.onCancel(),
      prev: () => this.stepper.prevStep(),
    });
  }
  findSeaportById(id: string) {
    this.service.findSeaportById(id).subscribe({
      next: (result) => (this.seaport = result),
      error: (error) => console.error(error),
    });
  }
  onStepChange(step: number) {
    this.currentStep = step;
  }


  searchBySeaportName() {
    this.service.searchSeaportByNameActive(this.seaportName).subscribe({
      next: (result) => {
        this.seaports = result;
        this.nbrSeaports = this.seaports.length;
        console.log(this.seaports);
      },
      error: (error) => console.error(error),
    });
  }

  ngOnInit(): void {
    this.getActiveSeaports()
  }

  getActiveSeaports() {
    this.loading = true;
    this.service.getActiveSeaports()
      .subscribe({
        next: (result) => {
          this.seaports = result;
          this.nbrSeaports = this.seaports.length;
          console.log(this.seaports)
        },
        error: (error) => {
          this.loading = false;
          console.error(error);
        },
        complete: () => (this.loading = false),
      });
  }


  sortBySeaportCodeValid: boolean = true;
  SeaportCode() {
    if (this.sortBySeaportCodeValid) {
      this.seaports.sort((a, b) => a.seaportCode.localeCompare(b.seaportCode));
      this.sortBySeaportCodeValid = false
    } else {
      this.seaports.sort((a, b) => b.seaportCode.localeCompare(a.seaportCode));
      this.sortBySeaportCodeValid = true
    }
  }

  sortBySeaportNameValid: boolean = true;
  sortBySeaportName() {
    if (this.sortBySeaportNameValid) {
      this.seaports.sort((a, b) => a.seaportName.localeCompare(b.seaportName));
      this.sortBySeaportNameValid = false
    } else {
      this.seaports.sort((a, b) => b.seaportName.localeCompare(a.seaportName));
      this.sortBySeaportNameValid = true
    }
  }
  sortByNotesValid: boolean = true;
  sortByNotes() {
    if (this.sortByNotesValid) {
      this.seaports.sort((a, b) => a.notes.localeCompare(b.notes));
      this.sortByNotesValid = false
    } else {
      this.seaports.sort((a, b) => b.notes.localeCompare(a.notes));
      this.sortByNotesValid = true
    }
  }


}
