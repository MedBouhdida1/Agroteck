import { Component, OnInit, ViewChild } from '@angular/core';
import { HotToastService } from '@ngneat/hot-toast';
import { TranslateService } from '@ngx-translate/core';
import { ConfirmDialogComponent } from 'app/shared/components/confirm-dialog/confirm-dialog.component';
import { StepperComponent } from 'app/shared/components/stepper/stepper.component';
import { WizardDialogComponent } from 'app/shared/components/wizard-dialog/wizard-dialog.component';
import { seaport } from '../../models/seaport.model';
import { seaportService } from '../../services/seaport.service';

@Component({
  selector: 'app-trash',
  templateUrl: './trash.component.html',
  styleUrls: ['./trash.component.scss']
})
export class TrashComponent implements OnInit {

  @ViewChild("deletePermaModal")
  deletePermaModal!: ConfirmDialogComponent;

  @ViewChild("dearchivedModal")
  dearchivedModal!: ConfirmDialogComponent;

  @ViewChild("formModal")
  formModal!: WizardDialogComponent;

  @ViewChild("stepper")
  stepper!: StepperComponent;

  loading?= false;
  pageNumber = 0;
  pageSize = 10;
  filter = "";

  seaport: seaport = {};
  seaports: Array<seaport> = [];
  seaportName: string = '';

  // Page: Page<Fournisseur> = initPage;
  // onPaginationChange: EventEmitter<string> = new EventEmitter<string>();

  constructor(
    private translateService: TranslateService,
    private toastService: HotToastService,
    private service: seaportService
  ) { }

  ngOnInit(): void {
    this.getArchivedSeaports()

  }
  getArchivedSeaports() {
    this.loading = true;
    this.service.getArchivedSeaports().subscribe({
      next: (result) => {
        this.seaports = result;
        console.log(this.seaports);
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
    this.service.findSeaportById(id).subscribe({
      next: (result) => (this.seaport = result),
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
      this.service.ActivateSeaport(id).subscribe({
        next: () => {
          this.getArchivedSeaports()
          this.dearchivedModal.hide();
          this.toastService.close("0");
          this.toastService.success(
            this.translateService.instant("success.restore", {
              elem: this.translateService.instant("Seaport"),
            })
          );
        },

        error: (error) => {
          this.dearchivedModal.hide();
          this.toastService.close("0");
          this.toastService.error(
            this.translateService.instant(error.error, {
              elem: this.translateService.instant("Seaport"),
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
          this.getArchivedSeaports()
          this.deletePermaModal.hide();
          this.toastService.close("0");
          this.toastService.success(
            this.translateService.instant("success.permadeleted", {
              elem: this.translateService.instant("product category"),
            })
          );
        },
        error: (error) => {
          this.deletePermaModal.hide();
          this.toastService.close("0");
          this.toastService.error(
            this.translateService.instant(error.error, {
              elem: this.translateService.instant("product category"),
            })
          );
        },
      });
    });
  }

  onClickActivate(id: string) {
    this.service.ActivateSeaport(id).subscribe({
      next: () => {
        this.getArchivedSeaports()

        this.toastService.success(
          this.translateService.instant("success.restore", {
            elem: this.translateService.instant("seaport"),
          })
        );
        console.log(id);
      },
    });
  }

  onClickDelete(id: string) {
    this.service.delete(id).subscribe({
      next: () => {
        this.getArchivedSeaports()
        console.log("Success");
        this.toastService.success(
          this.translateService.instant("success.permadeleted", {
            elem: this.translateService.instant("seaport"),
          })
        );
      },
    });
  }

  searchBySeaportName() {
    this.service.searchSeaportByNameArchived(this.seaportName).subscribe({
      next: (result) => {
        this.seaports = result;
        console.log(this.seaports);
      },
      error: (error) => console.error(error),
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
