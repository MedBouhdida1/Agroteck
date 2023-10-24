import { Component, OnInit, ViewChild } from '@angular/core';
import { DialogComponent } from '@progress/kendo-angular-dialog';
import { ConfirmDialogComponent } from 'app/shared/components/confirm-dialog/confirm-dialog.component';
import { StepperComponent } from 'app/shared/components/stepper/stepper.component';
import { WizardDialogComponent } from 'app/shared/components/wizard-dialog/wizard-dialog.component';
import { manufacturer } from '../../Models/manufacturer.model';
import { manufacturerService } from '../../Services/manufacturer.service';
import { TranslateService } from '@ngx-translate/core';
import { HotToastService } from '@ngneat/hot-toast';

@Component({
  selector: 'app-manufacturer-list',
  templateUrl: './manufacturer-list.component.html',
  styleUrls: ['./manufacturer-list.component.scss']
})
export class ManufacturerListComponent implements OnInit {

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
  manufacturer: manufacturer = {};
  // fournisseursPage: Page<Fournisseur> = initPage;
  page: number = 1;
  nbrManufacturers = 0;

  filter = "";
  manufacturers: Array<manufacturer> = [];
  manufacturerName: string = "";

  constructor(
    private service: manufacturerService,
    private translateService: TranslateService,
    private toastService: HotToastService,
  ) { }
  onCancel() {
    this.manufacturer = {};
    this.currentStep = 0;
  }

  onSave(id: string | null) {
    this.toastService.loading(
      this.translateService.instant("message.loading..."),
      { id: "0" }
    );

    this.service.save(id, this.manufacturer!).subscribe({
      next: () => {
        this.getActiveManufacturers();
        this.formModal.hide();
        this.onCancel();
        this.toastService.close("0");
        this.toastService.success(
          this.translateService.instant("success.saved", {
            elem: this.translateService.instant("manufacturer"),
          })
        );
      },
      error: (error) => {
        this.toastService.close("0");
        this.toastService.error(
          this.translateService.instant(error.error, {
            elem: this.translateService.instant("manufacturer"),
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
      title: "menu.add-manufacturer",
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
      this.service.deactivateManufacturer(id).subscribe({
        next: () => {
          this.getActiveManufacturers();
          this.deleteModal.hide();
          this.toastService.close("0");
          this.toastService.success(
            this.translateService.instant("success.deleted", {
              elem: this.translateService.instant("manufacturer"),
            })
          );
        },
        error: (error) => {
          this.deleteModal.hide();
          this.toastService.close("0");
          this.toastService.error(
            this.translateService.instant(error.error, {
              elem: this.translateService.instant("manufacturer"),
            })
          );
        },
      });
    });
  }
  onClickEdit(id: string) {
    this.findManufacturerById(id);
    this.formModal.show({
      title: "menu.edit-manufacturer",
      stepsCount: this.steps.length - 1,
      confirm: () => this.onWizardSave(id),
      cancel: () => this.onCancel(),
      prev: () => this.stepper.prevStep(),
    });
  }
  findManufacturerById(id: string) {
    this.service.findManufacturerById(id).subscribe({
      next: (result) => (this.manufacturer = result),
      error: (error) => console.error(error),
    });
  }
  onStepChange(step: number) {
    this.currentStep = step;
  }

  searchByManufacturerName() {
    this.service.searchManufacturerByNameActive(this.manufacturerName).subscribe({
      next: (result) => {
        this.manufacturers = result;
        console.log(this.manufacturers);
      },
      error: (error) => console.error(error),
    });
  }

  ngOnInit(): void {
    this.getActiveManufacturers();
  }

  getActiveManufacturers() {
    this.loading = true;
    this.service.getActiveManufacturers().subscribe({
      next: (result) => {
        this.manufacturers = result;
        this.nbrManufacturers = this.manufacturers.length;
        console.log(this.manufacturers);
      },
      error: (error) => {
        this.loading = false;
        console.error(error);
      },
      complete: () => (this.loading = false),
    });
  }

  sortByManufacturerCodeValid: boolean = true;
  manufacturerCode() {
    if (this.sortByManufacturerCodeValid) {
      this.manufacturers.sort((a, b) => a.manufacturerCode.localeCompare(b.manufacturerCode));
      this.sortByManufacturerCodeValid = false;
    } else {
      this.manufacturers.sort((a, b) => b.manufacturerCode.localeCompare(a.manufacturerCode));
      this.sortByManufacturerCodeValid = true;
    }
  }

  sortByManufacturerNameValid: boolean = true;
  sortByManufacturerName() {
    if (this.sortByManufacturerNameValid) {
      this.manufacturers.sort((a, b) => a.manufacturerName.localeCompare(b.manufacturerName));
      this.sortByManufacturerNameValid = false;
    } else {
      this.manufacturers.sort((a, b) => b.manufacturerName.localeCompare(a.manufacturerName));
      this.sortByManufacturerNameValid = true;
    }
  }
  sortByNotesValid: boolean = true;
  sortByNotes() {
    if (this.sortByNotesValid) {
      this.manufacturers.sort((a, b) => a.notes.localeCompare(b.notes));
      this.sortByNotesValid = false;
    } else {
      this.manufacturers.sort((a, b) => b.notes.localeCompare(a.notes));
      this.sortByNotesValid = true;
    }
  }

}
