import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'; // Import HttpClientModule to use HttpClient
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms'; // Dodaj import modułu FormsModule

import { AppComponent } from './app.component';
import { StartPageComponent } from './start-page/start-page.component';

@NgModule({
  declarations: [AppComponent, StartPageComponent],
  imports: [BrowserModule, FormsModule, HttpClientModule, RouterModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
