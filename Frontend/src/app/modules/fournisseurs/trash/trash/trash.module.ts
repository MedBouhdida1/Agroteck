import { NgModule } from "@angular/core";
import { TrashComponent } from "../trash.component";
import { CommonModule } from "@angular/common";
import { SharedModule } from "app/shared/shared.module";
import { SharedService } from "app/modules/company/services/shared.service";

@NgModule({
  declarations: [],
  imports: [CommonModule,
    SharedModule],
  providers: [SharedService],
})
export class TrashModule { }
