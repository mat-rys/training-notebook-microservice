import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';


import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { NutritionComponent } from './nutrition/meals-list/nutrition.component';
import { ProductComponent } from './nutrition/product-add/product.component';
import { ProductListComponent } from './nutrition/products-list/product-list.component';
import { MealAddProductsComponent } from './nutrition/meal-add-products/meal-add-products.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';



@NgModule({
  declarations: [
    AppComponent,
     NutritionComponent, 
     ProductComponent, 
     ProductListComponent,
      MealAddProductsComponent ,
   
    ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule, 
    FormsModule, 
    HttpClientModule, 
    AppRoutingModule,
  ], 
  providers: [   
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}


