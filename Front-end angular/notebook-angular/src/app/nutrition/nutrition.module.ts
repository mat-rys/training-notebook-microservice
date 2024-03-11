import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common'; 
import { RouterModule, Routes } from '@angular/router';
import { ProductListComponent } from './products-list/product-list.component';
import { ProductComponent } from './product-add/product.component';
import { MealAddProductsComponent } from './meal-add-products/meal-add-products.component';
import { NutritionComponent } from './meals-list/nutrition.component';
import { NavbarComponent } from './shared-child-component/navbar/navbar.component';
import { ListComponent } from './products-list/list/list.component';
import { ListMealsComponent } from './meals-list/list/list-meals.component';
import { CreateMealComponent } from './meals-list/create-meal/create-meal.component';
import { EditMealComponent } from './meals-list/edit-meal/edit-meal.component';
import { ListSearchProductsComponent } from './meal-add-products/list-search-products/list-search-products.component';
import { ListAddedMealProductsComponent } from './meal-add-products/list-added-meal-products/list-added-meal-products.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { DateAdapter, MatNativeDateModule, MAT_DATE_FORMATS } from '@angular/material/core';
import { MealsStatisticsComponent } from './meals-statistics/meals-statistics.component';

const routes: Routes = [
  { path: 'product-add', component: ProductComponent },
  { path: 'products-list', component: ProductListComponent },
  { path: 'meal-add-products', component: MealAddProductsComponent },
  { path: 'statistics', component: MealsStatisticsComponent },
  { path: '', component: NutritionComponent },
];

@NgModule({
  declarations: [
    ProductListComponent,
    ProductComponent,
    MealAddProductsComponent,
    NutritionComponent,
    NavbarComponent,
    ListComponent,
    ListMealsComponent,
    CreateMealComponent,
    EditMealComponent,
    ListSearchProductsComponent,
    ListAddedMealProductsComponent,
    MealsStatisticsComponent

  ],
  imports: [  
    HttpClientModule,
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  exports: [ 
    ProductListComponent,
    ProductComponent,
    MealAddProductsComponent,
    NutritionComponent
  ], 
})
export class NutritionModule {}
