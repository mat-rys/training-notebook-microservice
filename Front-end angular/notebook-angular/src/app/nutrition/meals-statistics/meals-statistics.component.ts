import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/security-config/auth.service';
import { NutritionStatisticsService } from '../services/nutrition-statistics.service';
import { Chart, PieController, ArcElement, CategoryScale, Tooltip, Legend } from 'chart.js';

Chart.register(PieController, ArcElement, CategoryScale, Tooltip, Legend);

@Component({
  selector: 'app-meals-statistics',
  templateUrl: './meals-statistics.component.html',
  styleUrls: ['./meals-statistics.component.css']
})
export class MealsStatisticsComponent implements OnInit {
  options = ['Najczęściej używane produkty', 'Ilość posiłków dziennie', 'Średnia ilość spożywanych kalorii'];
  selectedOption!: string;
  statistics: any;
  startDate!: string;
  endDate!: string;
  chart: any;

  constructor(private authService: AuthService,  private router: Router, private nutritionStatsService: NutritionStatisticsService) {}

  ngOnInit(): void {
  }

  handleLogout(){
    this.authService.removeToken();
  }

  loadStatistics() {
    switch(this.selectedOption) {
      case 'Najczęściej używane produkty':
        if (this.startDate && this.endDate) {
          this.nutritionStatsService.getMealStats(this.startDate, this.endDate).subscribe(
            data => {
              this.statistics = data;
              this.createPieChart();
            },
            error => {
              console.error('Error:', error);
            }
          );
        }
        break;
      // ...
    }
  }

  createPieChart() {
    const labels = this.statistics.map((stat: any) => stat.title);
    const data = this.statistics.map((stat: any) => stat.count);

    this.chart = new Chart('canvas', {
      type: 'pie',
      data: {
        labels: labels,
        datasets: [{
          data: data,
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            // Dodaj więcej kolorów, jeśli potrzebujesz obsłużyć więcej niż 4 produkty
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            // Dodaj więcej kolorów, jeśli potrzebujesz obsłużyć więcej niż 4 produkty
          ],
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false
      }
    });
  }
}