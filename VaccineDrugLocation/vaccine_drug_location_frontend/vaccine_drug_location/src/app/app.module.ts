import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {LoginComponent} from './components/login/login.component';
import {
  MedicationAppointmentComponent
} from './components/bh-employee/medication-appointment/medication-appointment.component';
import {BhDashboardComponent} from './components/bh-employee/bh-dashboard/bh-dashboard.component';
import {AuthService} from "./services/auth.service";
import {HttpClientModule} from "@angular/common/http";
import {ButtonModule} from 'primeng/button';
import {CardModule} from 'primeng/card';
import {ToolbarModule} from 'primeng/toolbar';
import {TableModule} from "primeng/table";
import {AccordionModule} from "primeng/accordion";
import {MenubarModule} from "primeng/menubar";
import {CalendarModule} from "primeng/calendar";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {InputTextModule} from "primeng/inputtext";
import {InputNumberModule} from "primeng/inputnumber";
import {InputSwitchModule} from "primeng/inputswitch";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MultiSelectModule} from "primeng/multiselect";
import {DropdownModule} from "primeng/dropdown";
import { AddArticleComponent } from './components/ges-employee/add-article/add-article.component';
import {ToastModule} from "primeng/toast";
import { ListAllArticlesComponent } from './components/ges-employee/list-all-articles/list-all-articles.component';
import { EditArticleComponent } from './components/ges-employee/edit-article/edit-article.component';
import { AddLocationComponent } from './components/bh-employee/add-location/add-location.component';
import { EditLocationComponent } from './components/bh-employee/edit-location/edit-location.component';
import { ListLocationsComponent } from './components/bh-employee/list-locations/list-locations.component';
import {ArticleService} from "./services/article.service";
import {LineService} from "./services/line.service";
import {LocationService} from "./services/location.service";
import { AddLineComponent } from './components/bh-employee/add-line/add-line.component';
import { ListLinesComponent } from './components/bh-employee/list-lines/list-lines.component';
import { DashboardComponent } from './components/lr-employee/dashboard/dashboard.component';
import { EditLineComponent } from './components/bh-employee/edit-line/edit-line.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MedicationAppointmentComponent,
    BhDashboardComponent,
    AddArticleComponent,
    ListAllArticlesComponent,
    EditArticleComponent,
    AddLocationComponent,
    EditLocationComponent,
    ListLocationsComponent,
    AddLineComponent,
    ListLinesComponent,
    DashboardComponent,
    EditLineComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    ButtonModule,
    CardModule,
    ToolbarModule,
    TableModule,
    AccordionModule,
    MenubarModule,
    CalendarModule,
    FormsModule,
    InputTextModule,
    InputNumberModule,
    InputSwitchModule,
    MultiSelectModule,
    DropdownModule,
    ToastModule,
    ReactiveFormsModule,
  ],
  providers: [
    HttpClientModule,
    AuthService,
    LocationService,
    ArticleService,
    LineService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
