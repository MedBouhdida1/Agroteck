import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import {
  NgModule,
  CUSTOM_ELEMENTS_SCHEMA,
  NO_ERRORS_SCHEMA,
} from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from "@angular/common/http";
import { RouterModule } from "@angular/router";
import { ChartsModule } from "@progress/kendo-angular-charts";
import { ButtonsModule } from "@progress/kendo-angular-buttons";
import { InputsModule } from "@progress/kendo-angular-inputs";
import { DropDownsModule } from "@progress/kendo-angular-dropdowns";
import { BrowserModule } from "@angular/platform-browser";
import { TreeViewModule } from "@progress/kendo-angular-treeview";
import { DateInputsModule } from "@progress/kendo-angular-dateinputs";
import { DatePickerModule } from "@progress/kendo-angular-dateinputs";
import { TranslateLoader, TranslateModule } from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { HotToastModule } from "@ngneat/hot-toast";

import { SharedModule } from "./shared/shared.module";
import { AppRoutingModule } from "./app.routing";
import { ComponentsModule } from "./components/components.module";
import { AppComponent } from "./app.component";
import { AdminLayoutComponent } from "./layouts/admin-layout/admin-layout.component";
import { StartPageComponent } from "./start-page/start-page.component";
import { LoginComponent } from "./login/login.component";
import { SetterCapacityComponent } from './modules/setter-capacity/setter-capacity.component';
import { HatcherCapacityComponent } from './modules/hatcher-capacity/hatcher-capacity.component';
import { IOTComponent } from './modules/iot/iot.component';
import { FeedTypeComponent } from './modules/feed-type/feed-type.component';
import { FeedFormulaComponent } from './modules/feed-formula/feed-formula.component';
import { FeedFormulaVersionComponent } from './modules/feed-formula-version/feed-formula-version.component';
import { FeedFormulaPriceComponent } from './modules/feed-formula-price/feed-formula-price.component';
import { WeightComponent } from './modules/weight/weight.component';
import { BreedCodeTypeComponent } from './modules/breed-code-type/breed-code-type.component';
import { AgeAssignmentComponent } from './modules/age-assignment/age-assignment.component';
import { EggClassComponent } from './modules/egg-class/egg-class.component';
import { MatAutocomplete, MatAutocompleteModule } from "@angular/material/autocomplete";
import { AuthGuard } from "./components/auth/auth.guard";
import { UserAuthService } from "./components/service/user-auth.service";
import { AuthInterceptor } from "./components/auth/auth.interceptor";
import { NgxPaginationModule } from 'ngx-pagination';

export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http);
}

@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    ComponentsModule,
    DropDownsModule,
    RouterModule,
    AppRoutingModule,
    ChartsModule,
    ButtonsModule,
    InputsModule,
    TreeViewModule,
    DateInputsModule,
    DatePickerModule,
    SharedModule,
    NgxPaginationModule,
    MatAutocompleteModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
    HotToastModule.forRoot({
      position: "top-center",
    }),
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    LoginComponent,
    StartPageComponent,
    SetterCapacityComponent,
    HatcherCapacityComponent,
    IOTComponent,
    FeedTypeComponent,
    FeedFormulaComponent,
    FeedFormulaVersionComponent,
    FeedFormulaPriceComponent,
    WeightComponent,
    BreedCodeTypeComponent,
    AgeAssignmentComponent,
    EggClassComponent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
  providers: [AuthGuard, {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  }, UserAuthService
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
