  import { NgModule } from '@angular/core';
  import { RouterModule, Routes } from '@angular/router';
  import { LoginComponent } from './auth/login/login.component'; 
  import { RegistrationComponent } from './auth/registration/registration.component'; 
  import { StartPageComponent } from './auth/start-page/start-page.component'; 
  import { NutritionComponent } from './nutrition/meals-list/nutrition.component';
  import { NoteAddComponent } from './notes/note-add/note-add.component';
  import { ProductComponent } from './nutrition/product-add/product.component';
  import {ProductListComponent } from './nutrition/products-list/product-list.component';
  import {MealAddProductsComponent } from './nutrition/meal-add-products/meal-add-products.component';
  import { AuthGuard } from './security-config/auth.guar';

  const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'registration', component: RegistrationComponent },
    { path: 'start-page', component: StartPageComponent },
    { path: 'account', loadChildren: () => import('./account/account.module').then(m => m.AccountModule), canActivate: [AuthGuard] },
    { path: 'bmi-chart', loadChildren: () => import('./bmi-chart/bmi-chart.module').then(m => m.BmiChartModule), canActivate: [AuthGuard] },
    { path: 'notes', loadChildren: () => import('./notes/note.module').then(m => m.NoteModule), canActivate: [AuthGuard] },
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
