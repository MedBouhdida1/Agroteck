import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { RouterModule, Routes } from "@angular/router";

import { DashboardComponent } from "./dashboard/dashboard.component";
import { HomeComponent } from "./home/home.component";
import { AdminLayoutComponent } from "./layouts/admin-layout/admin-layout.component";
import { LoginComponent } from "./login/login.component";
import { TrashCComponent } from "./modules/company/trash/trashC.component";
import { CostTrashComponent } from "./modules/cost-center/trash/costtrash.component";
import { CurrTrashComponent } from "./modules/currency/trash/curtrash.component";
import { TrashDComponent } from "./modules/division/trash/trashD.component";
import { TrashGComponent } from "./modules/growout/trash/trashG.component";
import { TrashWComponent } from "./modules/warehouse/trash/trashw.component";
import { TrashComponent } from "./shared/components/trash/trash.component";
import { StartPageComponent } from "./start-page/start-page.component";
import * as path from "path";
import { AuthGuard } from "./components/auth/auth.guard";
import { LoginGuard } from "./components/auth/login-guard.guard";

const routes: Routes = [
  {
    path: "",
    redirectTo: "login",
  },

  {
    path: "login",
    component: LoginComponent, canActivate: [LoginGuard],
    pathMatch: "full",
  },
  {
    path: "home",
    component: StartPageComponent, canActivate: [AuthGuard]
  },
  {
    path: "",
    component: AdminLayoutComponent, canActivate: [AuthGuard],
    children: [
      { path: "dashboard", component: HomeComponent },
      { path: "dashboard/products", component: DashboardComponent },
      { path: "start", component: StartPageComponent },

      {
        path: "produits",
        loadChildren: () =>
          import("./modules/produits/produits.module").then(
            (m) => m.ProduitsModule
          ),
      },

      {
        path: "fournisseurs",
        loadChildren: () =>
          import("./modules/fournisseurs/fournisseurs.module").then(
            (m) => m.FournisseursModule
          ),
      },
      {
        path: "airports",
        loadChildren: () =>
          import("./modules/airport/airport.module").then(
            (m) => m.AirportModule)
      },
      {
        path: "seaports",
        loadChildren: () =>
          import("./modules/seaport/seaport.module").then(
            (m) => m.SeaportModule)
      },
      {
        path: "reasons",
        loadChildren: () =>
          import("./modules/reason-code/reason-code.module").then(
            (m) => m.ReasonCodeModule)
      },
      {
        path: "manufacturers",
        loadChildren: () =>
          import("./modules/manufacturer/manufacturer.module").then(
            (m) => m.ManufacturerModule)
      },
      {
        path: "productcategories",
        loadChildren: () =>
          import("./modules/product-category/product-category.module").then(
            (m) => m.ProductCategoryModule)
      },
    ],
  },
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes, {
      useHash: true,
    }),
  ],
  exports: [],
})
export class AppRoutingModule { }
