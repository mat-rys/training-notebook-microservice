import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { StartPageComponent } from './start-page/start-page.component';
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component'; // Importuj AppRoutingModule

@NgModule({
  declarations: [AppComponent, StartPageComponent, LoginComponent, RegistrationComponent],
  imports: [BrowserModule, FormsModule, HttpClientModule, AppRoutingModule], // Dodaj AppRoutingModule
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
