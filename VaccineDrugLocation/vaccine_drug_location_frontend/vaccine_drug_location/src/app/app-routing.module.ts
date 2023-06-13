import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from "./components/login/login.component";
import {BhHomeComponent} from "./components/bh-employee/bh-home/bh-home.component";
import {AddArticleComponent} from "./components/ges-employee/add-article/add-article.component";
import {ArticleListComponent} from './components/ges-employee/article-list/article-list.component';
import {EditArticleComponent} from "./components/ges-employee/edit-article/edit-article.component";
import {AddLocationComponent} from "./components/bh-employee/add-location/add-location.component";
import {ListLocationComponent} from "./components/bh-employee/list-location/list-location.component";
import {EditLocationComponent} from "./components/bh-employee/edit-location/edit-location.component";
import {LocationInventoryComponent} from "./components/Inventory/location-inventory/location-inventory.component";


const routes: Routes = [
  {path: 'ct-home', component: LoginComponent},
  {path: 'bh-home/:state/:county', component: BhHomeComponent},

  {path: 'add-article', component: AddArticleComponent},
  {path: 'list-article', component: ArticleListComponent},
  {path: 'edit-article/:id', component: EditArticleComponent},

  {path: 'add-location', component: AddLocationComponent},
  {path: 'list-location', component: ListLocationComponent},
  {path: 'edit-location/:id', component: EditLocationComponent},

  {path: 'location-inventory', component: LocationInventoryComponent},

  {path: 'login', component: LoginComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
