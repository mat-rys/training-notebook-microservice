import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BmiChartComponent } from './bmi-chart.component';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common'; // Dodaj CommonModule

@NgModule({
  declarations: [BmiChartComponent],
  imports: [  BrowserModule,
    FormsModule,
    HttpClientModule,
    CommonModule], // Dodaj CommonModule],
  exports: [BmiChartComponent], // Opcjonalnie eksportuj komponent, jeśli będzie używany poza tym modulem
})
export class BmiChartModule {}
