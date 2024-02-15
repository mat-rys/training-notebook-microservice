import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BmiChartComponent } from './bmi-chart.component';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common'; // Dodaj CommonModule
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', component: BmiChartComponent },
];


@NgModule({
  declarations: [BmiChartComponent],
  imports: [  
    FormsModule,
    HttpClientModule,
    CommonModule,
    RouterModule.forChild(routes)
  ], // Dodaj CommonModule],
  exports: [BmiChartComponent], // Opcjonalnie eksportuj komponent, jeśli będzie używany poza tym modulem
})
export class BmiChartModule {}