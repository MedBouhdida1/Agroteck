import { Component, OnInit, ViewChild } from '@angular/core';
import { DialogComponent } from '@progress/kendo-angular-dialog';
import { ConfirmDialogComponent } from 'app/shared/components/confirm-dialog/confirm-dialog.component';
import { StepperComponent } from 'app/shared/components/stepper/stepper.component';
import { WizardDialogComponent } from 'app/shared/components/wizard-dialog/wizard-dialog.component';
import { reason } from '../../models/reason.model';
import { reasonService } from '../../services/reason.service';
import { TranslateService } from '@ngx-translate/core';
import { HotToastService } from '@ngneat/hot-toast';

@Component({
  selector: 'app-reason-list',
  templateUrl: './reason-list.component.html',
  styleUrls: ['./reason-list.component.scss']
})
export class ReasonListComponent implements OnInit {

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
  // fournisseurs: Array<Fournisseur> = [];
  reason: reason = {};
  // fournisseursPage: Page<Fournisseur> = initPage;
  pageNumber = 0;
  pageSize = 10;
  filter = "";
  reasons: Array<reason> = [];
  reasonName: string = '';



  constructor(
    private service: reasonService,
    private translateService: TranslateService,
    private toastService: HotToastService
  ) { }
  onCancel() {
    this.reason = {};
    this.currentStep = 0;
  }

  onSave(id: string | null) {
    this.toastService.loading(
      this.translateService.instant("message.loading..."),
      { id: "0" }
    );
    this.service.save(id, this.reason!).subscribe({
      next: () => {
        this.getActiveReasons()
        this.formModal.hide();
        this.onCancel();
        this.toastService.close("0");
        this.toastService.success(
          this.translateService.instant("success.saved", {
            elem: this.translateService.instant("reason"),
          })
        );
      },
      error: (error) => {
        this.toastService.close("0");
        this.toastService.error(
          this.translateService.instant(error.error, {
            elem: this.translateService.instant("reason"),
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
      title: "menu.add-reason",
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
      this.service.deactivateReason(id).subscribe({
        next: () => {
          this.getActiveReasons();
          this.deleteModal.hide();
          this.toastService.close("0");
          this.toastService.success(
            this.translateService.instant("success.deleted", {
              elem: this.translateService.instant("reason"),
            })
          );
        },
        error: (error) => {
          this.deleteModal.hide();
          this.toastService.close("0");
          this.toastService.error(
            this.translateService.instant(error.error, {
              elem: this.translateService.instant("reason"),
            })
          );
        },
      });
    });
  }
  onClickEdit(id: string) {
    this.findReasonById(id);
    this.formModal.show({
      title: "menu.edit-reason",
      stepsCount: this.steps.length - 1,
      confirm: () => this.onWizardSave(id),
      cancel: () => this.onCancel(),
      prev: () => this.stepper.prevStep(),
    });
  }
  findReasonById(id: string) {
    this.service.findReasonById(id).subscribe({
      next: (result) => (this.reason = result),
      error: (error) => console.error(error),
    });
  }
  onStepChange(step: number) {
    this.currentStep = step;
  }


  searchByReasonName() {
    this.service.searchReasonByNameActive(this.reasonName).subscribe({
      next: (result) => {
        this.reasons = result;
        console.log(this.reasons);
      },
      error: (error) => console.error(error),
    });
  }

  ngOnInit(): void {
    this.getActiveReasons()
  }

  getActiveReasons() {
    this.loading = true;
    this.service.getActiveReasons()
      .subscribe({
        next: (result) => {
          this.reasons = result;
          console.log(this.reasons)
        },
        error: (error) => {
          this.loading = false;
          console.error(error);
        },
        complete: () => (this.loading = false),
      });
  }


  sortByReasonCodeValid: boolean = true;
  ReasonCode() {
    if (this.sortByReasonCodeValid) {
      this.reasons.sort((a, b) => a.reasonCode.localeCompare(b.reasonCode));
      this.sortByReasonCodeValid = false
    } else {
      this.reasons.sort((a, b) => b.reasonCode.localeCompare(a.reasonCode));
      this.sortByReasonCodeValid = true
    }
  }

  sortByReasonNameValid: boolean = true;
  sortByReasonName() {
    if (this.sortByReasonNameValid) {
      this.reasons.sort((a, b) => a.reasonName.localeCompare(b.reasonName));
      this.sortByReasonNameValid = false
    } else {
      this.reasons.sort((a, b) => b.reasonName.localeCompare(a.reasonName));
      this.sortByReasonNameValid = true
    }
  }
  sortByNotesValid: boolean = true;
  sortByNotes() {
    if (this.sortByNotesValid) {
      this.reasons.sort((a, b) => a.notes.localeCompare(b.notes));
      this.sortByNotesValid = false
    } else {
      this.reasons.sort((a, b) => b.notes.localeCompare(a.notes));
      this.sortByNotesValid = true
    }
  }


}
