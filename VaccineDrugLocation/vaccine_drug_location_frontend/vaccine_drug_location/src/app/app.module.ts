import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {LoginComponent} from './components/login/login.component';
import {MedicationAppointmentComponent} from './components/bh-employee/medication-appointment/medication-appointment.component';
import {BhDashboardComponent} from './components/bh-employee/bh-dashboard/bh-dashboard.component';
import {BhHomeComponent} from './components/bh-employee/bh-home/bh-home.component';
import {AuthService} from "./services/auth.service";
import {PersonService} from "./services/person.service";
import {HttpClientModule} from "@angular/common/http";
import {ButtonModule} from 'primeng/button';
import {CardModule} from 'primeng/card';
import {ToolbarModule} from 'primeng/toolbar';
import {TableModule} from "primeng/table";
import {AccordionModule} from "primeng/accordion";
import {MenubarModule} from "primeng/menubar";
import {CalendarModule} from "primeng/calendar";
import {FormsModule} from "@angular/forms";
import {InputTextModule} from "primeng/inputtext";
import {InputNumberModule} from "primeng/inputnumber";
import {InputSwitchModule} from "primeng/inputswitch";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MultiSelectModule} from "primeng/multiselect";
import {DropdownModule} from "primeng/dropdown";
import {AddArticleComponent} from "./components/ges-employee/add-article/add-article.component";
import { EditArticleComponent } from './components/ges-employee/edit-article/edit-article.component';
import { AddLocationComponent } from './components/bh-employee/add-location/add-location.component';
import { AddLineComponent } from './components/bh-employee/add-line/add-line.component';
import { EditLineComponent } from './components/bh-employee/edit-line/edit-line.component';
import { EditLocationComponent } from './components/bh-employee/edit-location/edit-location.component';
import { LrDashboardComponent } from './components/lr-employee/lr-dashboard/lr-dashboard.component';
import { ArticleListComponent } from './components/ges-employee/article-list/article-list.component';
import { ListLocationComponent } from './components/bh-employee/list-location/list-location.component';
import { ListLineComponent } from './components/bh-employee/list-line/list-line.component';
import {LocationService} from "./services/location.service";
import { LocationInventoryComponent } from './components/Inventory/location-inventory/location-inventory.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MedicationAppointmentComponent,
    BhDashboardComponent,
    BhHomeComponent,
    AddArticleComponent,
    EditArticleComponent,
    AddLocationComponent,
    AddLineComponent,
    EditLineComponent,
    EditLocationComponent,
    LrDashboardComponent,
    ArticleListComponent,
    ListLocationComponent,
    ListLineComponent,
    LocationInventoryComponent,
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
  ],
  providers: [
    HttpClientModule,
    AuthService,
    PersonService,
    LocationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
