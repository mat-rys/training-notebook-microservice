import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common'; // Dodaj CommonModule
import { RouterModule, Routes } from '@angular/router';
import { ProductListComponent } from './products-list/product-list.component';
import { ProductComponent } from './product-add/product.component';
import { MealAddProductsComponent } from './meal-add-products/meal-add-products.component';
import { NutritionComponent } from './meals-list/nutrition.component';

const routes: Routes = [
  { path: 'product-add', component: ProductComponent },
  { path: 'products-list', component: ProductListComponent },
  { path: 'meal-add-products', component: MealAddProductsComponent },
  { path: '', component: NutritionComponent },
];

@NgModule({
  declarations: [
    ProductListComponent,
    ProductComponent,
    MealAddProductsComponent,
    NutritionComponent
  ],
  imports: [  
    HttpClientModule,
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes)
  ],
  exports: [ 
    ProductListComponent,
    ProductComponent,
    MealAddProductsComponent,
    NutritionComponent
  ], 
})
export class NutritionModule {}
