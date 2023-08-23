import { Component, OnInit, ViewChild } from '@angular/core';
import { DialogComponent } from '@progress/kendo-angular-dialog';
import { ConfirmDialogComponent } from 'app/shared/components/confirm-dialog/confirm-dialog.component';
import { StepperComponent } from 'app/shared/components/stepper/stepper.component';
import { WizardDialogComponent } from 'app/shared/components/wizard-dialog/wizard-dialog.component';
import { productCategory } from '../../Models/productCategory.model';
import { productCategoryService } from '../../Services/productCategory.service';
import { TranslateService } from '@ngx-translate/core';
import { HotToastService } from '@ngneat/hot-toast';

@Component({
  selector: 'app-product-category-list',
  templateUrl: './product-category-list.component.html',
  styleUrls: ['./product-category-list.component.scss']
})
export class ProductCategoryListComponent implements OnInit {


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
  productCategory: productCategory = {};
  // fournisseursPage: Page<Fournisseur> = initPage;
  pageNumber = 0;
  pageSize = 10;
  filter = "";
  productCategories: Array<productCategory> = [];
  productCategoryName: string = "";

  constructor(
    private service: productCategoryService,
    private translateService: TranslateService,
    private toastService: HotToastService,
  ) { }
  onCancel() {
    this.productCategory = {};
    this.currentStep = 0;
  }

  onSave(id: string | null) {
    this.toastService.loading(
      this.translateService.instant("message.loading..."),
      { id: "0" }
    );

    this.service.save(id, this.productCategory!).subscribe({
      next: () => {
        this.getActiveProductCategories();
        this.formModal.hide();
        this.onCancel();
        this.toastService.close("0");
        this.toastService.success(
          this.translateService.instant("success.saved", {
            elem: this.translateService.instant("product Category"),
          })
        );
      },
      error: (error) => {
        this.toastService.close("0");
        this.toastService.error(
          this.translateService.instant(error.error, {
            elem: this.translateService.instant("product Category"),
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
      title: "menu.add-product-category",
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
      this.service.deactivateProductCategory(id).subscribe({
        next: () => {
          this.getActiveProductCategories();
          this.deleteModal.hide();
          this.toastService.close("0");
          this.toastService.success(
            this.translateService.instant("success.deleted", {
              elem: this.translateService.instant("product Category"),
            })
          );
        },
        error: (error) => {
          this.deleteModal.hide();
          this.toastService.close("0");
          this.toastService.error(
            this.translateService.instant(error.error, {
              elem: this.translateService.instant("product Category"),
            })
          );
        },
      });
    });
  }
  onClickEdit(id: string) {
    this.findProductCategoryById(id);
    this.formModal.show({
      title: "menu.edit-product-category",
      stepsCount: this.steps.length - 1,
      confirm: () => this.onWizardSave(id),
      cancel: () => this.onCancel(),
      prev: () => this.stepper.prevStep(),
    });
  }
  findProductCategoryById(id: string) {
    this.service.findProductCategoryById(id).subscribe({
      next: (result) => (this.productCategory = result),
      error: (error) => console.error(error),
    });
  }
  onStepChange(step: number) {
    this.currentStep = step;
  }

  searchProductCategoryByName() {
    this.service.searchProductCategoryByNameActive(this.productCategoryName).subscribe({
      next: (result) => {
        this.productCategories = result;
        console.log(this.productCategories);
      },
      error: (error) => console.error(error),
    });
  }

  ngOnInit(): void {
    this.getActiveProductCategories();
  }

  getActiveProductCategories() {
    this.loading = true;
    this.service.getActiveProductCategories().subscribe({
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
