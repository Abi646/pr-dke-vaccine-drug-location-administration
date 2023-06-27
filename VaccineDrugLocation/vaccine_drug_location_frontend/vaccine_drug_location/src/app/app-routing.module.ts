import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from "./components/login/login.component";
import {AddArticleComponent} from "./components/ges-employee/add-article/add-article.component";
import {ListAllArticlesComponent} from "./components/ges-employee/list-all-articles/list-all-articles.component";
import {EditArticleComponent} from "./components/ges-employee/edit-article/edit-article.component";
import {AddLocationComponent} from "./components/bh-employee/add-location/add-location.component";
import {ListLocationsComponent} from "./components/bh-employee/list-locations/list-locations.component";
import {EditLocationComponent} from "./components/bh-employee/edit-location/edit-location.component";
import {AddLineComponent} from "./components/bh-employee/add-line/add-line.component";
import {ListLinesComponent} from "./components/bh-employee/list-lines/list-lines.component";
import {DashboardComponent} from "./components/lr-employee/dashboard/dashboard.component";
import {EditLineComponent} from "./components/bh-employee/edit-line/edit-line.component";

const routes: Routes = [
  {path: 'home', component: LoginComponent},
  {path: 'add-article', component: AddArticleComponent},
  {path: 'articles', component: ListAllArticlesComponent},
  {path: 'articles/:id', component: EditArticleComponent},
  {path: 'locations', component: ListLocationsComponent},
  {path: 'add-location', component: AddLocationComponent},
  {path: 'locations/:id', component: EditLocationComponent},
  {path: 'add-lines', component: AddLineComponent},
  {path: 'lines/:id', component: EditLineComponent},
  {path: 'lines', component: ListLinesComponent},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'login', component: LoginComponent},
  {path: '**', component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
