import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CTHomeComponent} from "./components/contact-tracer/ct-home/c-t-home.component";
import {LoginComponent} from "./components/login/login.component";
import {AddPersonComponent} from "./components/contact-tracer/add-person/add-person.component";
import {BhHomeComponent} from "./components/bh-employee/bh-home/bh-home.component";
import {EditPersonComponent} from "./components/contact-tracer/edit-person/edit-person.component";
import {SickInfoComponent} from "./components/contact-tracer/sick-info/sick-info.component";
import {ClusterComponent} from "./components/contact-tracer/cluster/cluster.component";
import {AddArticleComponent} from "./components/ges-employee/add-article/add-article.component";
import {ListAllArticlesComponent} from "./components/ges-employee/list-all-articles/list-all-articles.component";
import {EditArticleComponent} from "./components/ges-employee/edit-article/edit-article.component";
import {AddLocationComponent} from "./components/bh-employee/add-location/add-location.component";
import {ListLocationsComponent} from "./components/bh-employee/list-locations/list-locations.component";
import {EditLocationComponent} from "./components/bh-employee/edit-location/edit-location.component";
import {AddLineComponent} from "./components/bh-employee/add-line/add-line.component";

const routes: Routes = [
  {path: 'ct-home', component: CTHomeComponent},
  {path: 'bh-home/:state/:county', component: BhHomeComponent},
  {path: 'add-article', component: AddArticleComponent},
  {path: 'articles', component: ListAllArticlesComponent},
  {path: 'articles/:id', component: EditArticleComponent},
  {path: 'locations', component: ListLocationsComponent},
  {path: 'add-location', component: AddLocationComponent},
  {path: 'locations/:id', component: EditLocationComponent},
  {path: 'lines', component: AddLineComponent},
  {path: 'login', component: LoginComponent},
  {path: 'add', component: AddPersonComponent},
  {path: 'edit/:id', component: EditPersonComponent},
  {path: 'sickInfo/:id', component: SickInfoComponent},
  {path: 'cluster', component: ClusterComponent},
  {path: '**', component: CTHomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
