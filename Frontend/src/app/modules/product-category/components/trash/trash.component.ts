import { Component, OnInit, ViewChild } from '@angular/core';
import { ConfirmDialogComponent } from 'app/shared/components/confirm-dialog/confirm-dialog.component';
import { StepperComponent } from 'app/shared/components/stepper/stepper.component';
import { WizardDialogComponent } from 'app/shared/components/wizard-dialog/wizard-dialog.component';
import { productCategory } from '../../Models/productCategory.model';
import { TranslateService } from '@ngx-translate/core';
import { HotToastService } from '@ngneat/hot-toast';
import { productCategoryService } from '../../Services/productCategory.service';

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
  pageNumber = 0;
  pageSize = 10;
  filter = "";

  productcategory: productCategory = {};
  productCategories: Array<productCategory> = [];
  productCategoryName: string = "";

  // Page: Page<Fournisseur> = initPage;
  // onPaginationChange: EventEmitter<string> = new EventEmitter<string>();

  constructor(
    private translateService: TranslateService,
    private toastService: HotToastService,
    private service: productCategoryService
  ) { }

  ngOnInit(): void {
    this.getArchivedProductCategories()

  }
  getArchivedProductCategories() {
    this.loading = true;
    this.service.getArchivedProductCategories().subscribe({
      next: (result) => {
        this.productCategories = result;
        console.log(this.productCategories);
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
    this.service.findProductCategoryById(id).subscribe({
      next: (result) => (this.productcategory = result),
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
      this.service.ActivateProductCategory(id).subscribe({
        next: () => {
          this.getArchivedProductCategories()
          this.dearchivedModal.hide();
          this.toastService.close("0");
          this.toastService.success(
            this.translateService.instant("success.restore", {
              elem: this.translateService.instant("product category"),
            })
          );
        },

        error: (error) => {
          this.dearchivedModal.hide();
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
          this.getArchivedProductCategories()
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


  searchProductCategoryByName() {
    this.service.searchProductCategoryByNameArchived(this.productCategoryName).subscribe({
      next: (result) => {
        this.productCategories = result;
        console.log(this.productCategories);
      },
      error: (error) => console.error(error),
    });
  }

  sortByProductCategoryCodeValid: boolean = true;
  productCategoryCode() {
    if (this.sortByProductCategoryCodeValid) {
      this.productCategories.sort((a, b) => a.productCategoryCode.localeCompare(b.productCategoryCode));
      this.sortByProductCategoryCodeValid = false;
    } else {
      this.productCategories.sort((a, b) => b.productCategoryCode.localeCompare(a.productCategoryCode));
      this.sortByProductCategoryCodeValid = true;
    }
  }

  sortByProductCategoryNameValid: boolean = true;
  sortByProductCategoryName() {
    if (this.sortByProductCategoryNameValid) {
      this.productCategories.sort((a, b) => a.productCategoryName.localeCompare(b.productCategoryName));
      this.sortByProductCategoryNameValid = false;
    } else {
      this.productCategories.sort((a, b) => b.productCategoryName.localeCompare(a.productCategoryName));
      this.sortByProductCategoryNameValid = true;
    }
  }
  sortByProductCategoryTypeValid: boolean = true;
  sortByProductCategoryType() {
    if (this.sortByProductCategoryTypeValid) {
      this.productCategories.sort((a, b) => a.productCategoryType.localeCompare(b.productCategoryType));
      this.sortByProductCategoryTypeValid = false;
    } else {
      this.productCategories.sort((a, b) => b.productCategoryType.localeCompare(a.productCategoryType));
      this.sortByProductCategoryTypeValid = true;
    }
  }
  sortByNotesValid: boolean = true;
  sortByNotes() {
    if (this.sortByNotesValid) {
      this.productCategories.sort((a, b) => a.notes.localeCompare(b.notes));
      this.sortByNotesValid = false;
    } else {
      this.productCategories.sort((a, b) => b.notes.localeCompare(a.notes));
      this.sortByNotesValid = true;
    }
  }

}
