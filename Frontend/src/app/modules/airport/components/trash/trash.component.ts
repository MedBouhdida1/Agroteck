import { Component, OnInit, ViewChild } from '@angular/core';
import { ConfirmDialogComponent } from 'app/shared/components/confirm-dialog/confirm-dialog.component';
import { StepperComponent } from 'app/shared/components/stepper/stepper.component';
import { WizardDialogComponent } from 'app/shared/components/wizard-dialog/wizard-dialog.component';
import { airport } from '../../models/airport.model';
import { TranslateService } from '@ngx-translate/core';
import { HotToastService } from '@ngneat/hot-toast';
import { airportService } from '../../Services/airport.service';

@Component({
  selector: 'app-trash',
  templateUrl: './trash.component.html',
  styleUrls: ['./trash.component.scss']
})
export class TrashComponent implements OnInit {

  @ViewChild("deleteModal")
  deleteModal!: ConfirmDialogComponent;

  @ViewChild("deletePermaModal")
  deletePermaModal!: ConfirmDialogComponent;


  @ViewChild("dearchivedModal")
  dearchivedModal!: ConfirmDialogComponent;

  @ViewChild("formModal")
  formModal!: WizardDialogComponent;

  @ViewChild("stepper")
  stepper!: StepperComponent;

  loading?= false;

  filter = "";

  airport: airport = {};
  airports: Array<airport> = [];
  airportName: string = "";
  nbrAirports = 0;
  pages: number = 1;
  // Page: Page<Fournisseur> = initPage;
  // onPaginationChange: EventEmitter<string> = new EventEmitter<string>();

  constructor(
    private translateService: TranslateService,
    private toastService: HotToastService,
    private service: airportService
  ) { }

  ngOnInit(): void {
    this.getArchivedAirports()

  }
  getArchivedAirports() {
    this.loading = true;
    this.service.getArchivedAirports().subscribe({
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
    this.service.findAirportById(id).subscribe({
      next: (result) => (this.airport = result),
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
      this.service.ActivateAirport(id).subscribe({
        next: () => {
          this.getArchivedAirports()
          this.dearchivedModal.hide();
          this.toastService.close("0");
          this.toastService.success(
            this.translateService.instant("success.restore", {
              elem: this.translateService.instant("airport"),
            })
          );
        },

        error: (error) => {
          this.dearchivedModal.hide();
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
          this.getArchivedAirports()
          this.deletePermaModal.hide();
          this.toastService.close("0");
          this.toastService.success(
            this.translateService.instant("success.permadeleted", {
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

  searchByAirportName() {
    this.service.searchAirportByNameArchived(this.airportName).subscribe({
      next: (result) => {
        this.airports = result;
        console.log(this.airports);
      },
      error: (error) => console.error(error),
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
