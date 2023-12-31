import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";

import { FooterComponent } from "./footer/footer.component";
import { NavbarComponent } from "./navbar/navbar.component";
import { SidebarComponent } from "./sidebar/sidebar.component";
import { SharedModule } from "app/shared/shared.module";
import { MatAutocompleteModule } from '@angular/material/autocomplete';

@NgModule({
  imports: [CommonModule, RouterModule, SharedModule, MatAutocompleteModule
  ],
  declarations: [FooterComponent, NavbarComponent, SidebarComponent],
  exports: [FooterComponent, NavbarComponent, SidebarComponent],
})
export class ComponentsModule { }
