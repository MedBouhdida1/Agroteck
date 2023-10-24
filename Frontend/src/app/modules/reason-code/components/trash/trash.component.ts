import { Component, OnInit, ViewChild } from '@angular/core';
import { ConfirmDialogComponent } from 'app/shared/components/confirm-dialog/confirm-dialog.component';
import { StepperComponent } from 'app/shared/components/stepper/stepper.component';
import { WizardDialogComponent } from 'app/shared/components/wizard-dialog/wizard-dialog.component';
import { reason } from '../../models/reason.model';
import { TranslateService } from '@ngx-translate/core';
import { HotToastService } from '@ngneat/hot-toast';
import { reasonService } from '../../services/reason.service';

@Component({
  selector: 'app-trash',
  templateUrl: './trash.component.html',
  styleUrls: ['./trash.component.scss']
})
export class TrashComponent implements OnInit {

  @ViewChild("dearchivedModal")
  dearchivedModal!: ConfirmDialogComponent;

  @ViewChild("deletePermaModal")
  deletePermaModal!: ConfirmDialogComponent;

  @ViewChild("formModal")
  formModal!: WizardDialogComponent;



  loading?= false;
  nbrReasons = 0;
  page: number = 1;
  filter = "";

  reason: reason = {};
  reasons: Array<reason> = [];
  reasonName: string = '';

  // Page: Page<Fournisseur> = initPage;
  // onPaginationChange: EventEmitter<string> = new EventEmitter<string>();

  constructor(
    private translateService: TranslateService,
    private toastService: HotToastService,
    private service: reasonService
  ) { }

  ngOnInit(): void {
    this.getArchivedReasons()

  }
  getArchivedReasons() {
    this.loading = true;
    this.service.getArchivedReasons().subscribe({
      next: (result) => {
        this.reasons = result;
        this.nbrReasons = this.reasons.length;
        console.log(this.reasons);
      },
      error: (error) => {
        this.loading = false;
        console.error(error);
      },
      complete: () => (this.loading = false),
    });
  }

  // findArchivedPage() {
  //   this.loading = true;
  //   this.fournisseursService
  //     .findArchivedPage(this.pageNumber, this.pageSize, this.filter)
  //     .subscribe({
  //       next: (result) => {
  //         this.fournisseurs = result.content;
  //         this.Page = result;
  //       },
  //       error: (error) => {
  //         this.loading = false;
  //         console.error(error);
  //       },
  //       complete: () => (this.loading = false),
  //     });
  // }

  findById(id: string) {
    this.service.findReasonById(id).subscribe({
      next: (result) => (this.reason = result),
      error: (error) => console.error(error),
    });
  }

  // onFilterChange(filter: string) {
  //   this.filter = filter;
  //   this.pageNumber = 0;
  //   this.onPaginationChange.emit("");
  // }

  // onPageNumberChange(pageNumber: number) {
  //   this.pageNumber = pageNumber;
  //   this.onPaginationChange.emit("");
  // }

  // onPageSizeChange(pageSize: number) {
  //   this.pageSize = pageSize;
  //   this.pageNumber = 0;
  //   this.onPaginationChange.emit("");
  // }



  onclickActivateModal(id: string) {
    this.dearchivedModal.showDearchive(() => {
      this.toastService.loading(
        this.translateService.instant("message.loading..."),
        {
          id: "0",
        }
      );
      this.service.ActivateReason(id).subscribe({
        next: () => {
          this.getArchivedReasons()
          this.dearchivedModal.hide();
          this.toastService.close("0");
          this.toastService.success(
            this.translateService.instant("success.restore", {
              elem: this.translateService.instant("Reason code"),
            })
          );
        },

        error: (error) => {
          this.dearchivedModal.hide();
          this.toastService.close("0");
          this.toastService.error(
            this.translateService.instant(error.error, {
              elem: this.translateService.instant("Reason code"),
            })
          );
        },
      });
    });
  }


  onclickDeletePerma(id: string) {
    this.deletePermaModal.showPermaDelete(() => {
      this.toastService.loading(
        this.translateService.instant("message.loading..."),
        {
          id: "0",
        }
      );
      this.service.delete(id).subscribe({
        next: () => {
          this.getArchivedReasons()
          this.deletePermaModal.hide();
          this.toastService.close("0");
          this.toastService.success(
            this.translateService.instant("success.permadeleted", {
              elem: this.translateService.instant("Reason code"),
            })
          );
        },
        error: (error) => {
          this.deletePermaModal.hide();
          this.toastService.close("0");
          this.toastService.error(
            this.translateService.instant(error.error, {
              elem: this.translateService.instant("Reason code"),
            })
          );
        },
      });
    });
  }

  onClickActivate(id: string) {
    this.service.ActivateReason(id).subscribe({
      next: () => {
        this.getArchivedReasons()

        this.toastService.success(
          this.translateService.instant("success.restore", {
            elem: this.translateService.instant("reason"),
          })
        );
        console.log(id);
      },
    });
  }

  onClickDelete(id: string) {
    this.service.delete(id).subscribe({
      next: () => {
        this.getArchivedReasons()
        console.log("Success");
        this.toastService.success(
          this.translateService.instant("success.permadeleted", {
            elem: this.translateService.instant("reason"),
          })
        );
      },
    });
  }
  searchByReasonName() {
    this.service.searchReasonByNameArchived(this.reasonName).subscribe({
      next: (result) => {
        this.reasons = result;
        console.log(this.reasons);
      },
      error: (error) => console.error(error),
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
