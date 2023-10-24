import { Component, OnInit, ViewChild } from '@angular/core';
import { ConfirmDialogComponent } from 'app/shared/components/confirm-dialog/confirm-dialog.component';
import { StepperComponent } from 'app/shared/components/stepper/stepper.component';
import { WizardDialogComponent } from 'app/shared/components/wizard-dialog/wizard-dialog.component';
import { manufacturer } from '../../Models/manufacturer.model';
import { TranslateService } from '@ngx-translate/core';
import { HotToastService } from '@ngneat/hot-toast';
import { manufacturerService } from '../../Services/manufacturer.service';

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

  @ViewChild("stepper")
  stepper!: StepperComponent;

  loading?= false;
  page: number = 1;
  nbrManufacturers = 0;
  filter = "";

  manufacturer: manufacturer = {};
  manufacturers: Array<manufacturer> = [];
  manufacturerName: string = "";

  // Page: Page<Fournisseur> = initPage;
  // onPaginationChange: EventEmitter<string> = new EventEmitter<string>();

  constructor(
    private translateService: TranslateService,
    private toastService: HotToastService,
    private service: manufacturerService
  ) { }

  ngOnInit(): void {
    this.getArchivedManufacturers()

  }
  getArchivedManufacturers() {
    this.loading = true;
    this.service.getArchivedManufacturers().subscribe({
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
    this.service.findManufacturerById(id).subscribe({
      next: (result) => (this.manufacturer = result),
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
      this.service.ActivateManufacturer(id).subscribe({
        next: () => {
          this.getArchivedManufacturers()
          this.dearchivedModal.hide();
          this.toastService.close("0");
          this.toastService.success(
            this.translateService.instant("success.restore", {
              elem: this.translateService.instant("Manufacturer"),
            })
          );
        },

        error: (error) => {
          this.dearchivedModal.hide();
          this.toastService.close("0");
          this.toastService.error(
            this.translateService.instant(error.error, {
              elem: this.translateService.instant("Manufacturer"),
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
          this.getArchivedManufacturers()
          this.deletePermaModal.hide();
          this.toastService.close("0");
          this.toastService.success(
            this.translateService.instant("success.permadeleted", {
              elem: this.translateService.instant("Manufacturer"),
            })
          );
        },
        error: (error) => {
          this.deletePermaModal.hide();
          this.toastService.close("0");
          this.toastService.error(
            this.translateService.instant(error.error, {
              elem: this.translateService.instant("Manufacturer"),
            })
          );
        },
      });
    });
  }


  searchByManufacturerName() {
    this.service.searchManufacturerByNameArchived(this.manufacturerName).subscribe({
      next: (result) => {
        this.manufacturers = result;
        console.log(this.manufacturers);
      },
      error: (error) => console.error(error),
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
