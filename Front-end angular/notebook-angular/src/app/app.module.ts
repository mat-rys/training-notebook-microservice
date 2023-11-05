import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { StartPageComponent } from './start-page/start-page.component';
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { AccountComponent } from './account/account.component';
import { BmiChartComponent } from './bmi-chart/bmi-chart.component';
import { NoteComponent } from './note/note.component';
import { NutritionComponent } from './nutrition/nutrition.component';
import { NoteAddComponent } from './note-add/note-add.component';
import { ProductComponent } from './product/product.component';
import { ProductListComponent } from './product-list/product-list.component';
import { MealAddProductsComponent } from './meal-add-products/meal-add-products.component'; // Importuj AppRoutingModule



@NgModule({
  declarations: [AppComponent, StartPageComponent, LoginComponent, RegistrationComponent, 
    AccountComponent, BmiChartComponent, NoteComponent, NutritionComponent, NoteAddComponent, ProductComponent, ProductListComponent, MealAddProductsComponent],
  imports: [
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


