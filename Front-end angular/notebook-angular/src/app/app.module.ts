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
import { CalendarComponent } from './calendar/calendar.component';
import { SettingsComponent } from './settings/settings.component'; // Importuj AppRoutingModule

@NgModule({
  declarations: [AppComponent, StartPageComponent, LoginComponent, RegistrationComponent, AccountComponent, BmiChartComponent, NoteComponent, CalendarComponent, SettingsComponent],
  imports: [BrowserModule, FormsModule, HttpClientModule, AppRoutingModule], 
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}


