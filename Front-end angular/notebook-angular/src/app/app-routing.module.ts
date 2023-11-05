import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component'; 
import { RegistrationComponent } from './registration/registration.component'; 
import { AccountComponent } from './account/account.component';
import { StartPageComponent } from './start-page/start-page.component'; 
import { BmiChartComponent } from './bmi-chart/bmi-chart.component';
import { NoteComponent } from './note/note.component';
import { NutritionComponent } from './nutrition/nutrition.component';
import { NoteAddComponent } from './note-add/note-add.component';
import { ProductComponent } from './product/product.component';
import {ProductListComponent } from './product-list/product-list.component';
import {MealAddProductsComponent } from './meal-add-products/meal-add-products.component';
import { AuthGuard } from './auth.guar';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'registration', component: RegistrationComponent },
  { path: 'start-page', component: StartPageComponent },
  { path: 'account', component: AccountComponent, canActivate: [AuthGuard] },
  { path: 'bmi-chart', component: BmiChartComponent, canActivate: [AuthGuard] },
  { path: 'notes', component: NoteComponent, canActivate: [AuthGuard] },
  { path: 'notes-add', component: NoteAddComponent, canActivate: [AuthGuard] },
  { path: 'product-add', component: ProductComponent, canActivate: [AuthGuard] },
  { path: 'products-list', component: ProductListComponent, canActivate: [AuthGuard] },
  { path: 'meal-add-products', component: MealAddProductsComponent, canActivate: [AuthGuard] },
  { path: 'nutrition', component: NutritionComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: 'start-page', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
