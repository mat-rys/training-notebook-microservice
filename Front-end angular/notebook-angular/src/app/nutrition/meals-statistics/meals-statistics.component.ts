import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/security-config/auth.service';
import { NutritionStatisticsService } from '../services/nutrition-statistics.service';
import { Chart, PieController, ArcElement, CategoryScale, Tooltip, Legend,LineController, LineElement, PointElement, LinearScale, Title } from 'chart.js';


Chart.register(PieController, ArcElement, CategoryScale, Tooltip, Legend, LineController, LineElement, PointElement, LinearScale, Title);

@Component({
  selector: 'app-meals-statistics',
  templateUrl: './meals-statistics.component.html',
  styleUrls: ['./meals-statistics.component.css']
})
export class MealsStatisticsComponent implements OnInit {
  options = ['Most used products', 'Average nutrition daily', 'Calories statistics'];
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

  setColor(color: string) {
  }

  loadStatistics() {
    switch(this.selectedOption) {
      case 'Most used products':
        if (this.startDate && this.endDate) {
          this.nutritionStatsService.getMealStats(this.startDate, this.endDate).subscribe(
            data => {
              this.statistics = data;
              this.createPieChart('Most used products');
            },
            error => {
              console.error('Error:', error);
            }
          );
        }
        break;
      case 'Average nutrition daily':
        if (this.startDate && this.endDate) {
          this.nutritionStatsService.getAverageNutrients(this.startDate, this.endDate).subscribe(
            data => {
              this.statistics = data[0]; 
              console.log('Average statistics:', data);
              this.createPieChart('Average statistics');
            },
            error => {
              console.error('Error:', error);
            }
          );
        }
        break;
        case 'Calories statistics':
          if (this.startDate && this.endDate) {
            this.nutritionStatsService.getSumCaloriesByUserIdAndDateRange(this.startDate, this.endDate).subscribe(
              data => {
                this.statistics = data;
                console.log('Calories statistics:', data);
                this.createLineChart('Calories statistics');
              },
              error => {
                console.error('Error:', error);
              }
            );
          }
          break;
      }
    }

    createLineChart(chartType: string) {
      let labels, data;
      if (chartType === 'Calories statistics') {
        labels = this.statistics.map((stat: any) => new Date(stat.day).toISOString().split('T')[0]);
        data = this.statistics.map((stat: any) => stat.calories);
      }
    
      this.chart = new Chart('canvas', {
        type: 'line',
        data: {
          labels: labels,
          datasets: [{
            label: 'Calories',
            data: data,
            fill: false,
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              labels: {
                color: 'white',
              }
            }
          },
          scales: {
            x: {
              display: true,
              title: {
                display: true,
                text: 'Date (YYYY-MM-DD)',
                color: 'white'
              },
              ticks: {
                color: 'white'
              }
            },
            y: {
              display: true,
              title: {
                display: true,
                text: 'Calories',
                color: 'white'
              },
              ticks: {
                color: 'white'
              }
            }
          }
        }
      });
    }
    
    
  
  createPieChart(chartType: string) {
    let labels, data;
    if (chartType === 'Most used products') {
      labels = this.statistics.map((stat: any) => stat.title);
      data = this.statistics.map((stat: any) => stat.count);
    } else { 
      labels = ['Fat', 'Protein', 'Carbs'];
      data = [this.statistics.avgFat, this.statistics.avgProtein, this.statistics.avgCarbs];
    }
  
    const backgroundColors = labels.map(() => `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)},
     ${Math.floor(Math.random() * 255)}, 0.9)`); 
    const borderColors = backgroundColors.map((color: string) => color.replace('0.9', '1'));
  
    this.chart = new Chart('canvas', {
      type: 'pie',
      data: {
        labels: labels,
        datasets: [{
          data: data,
          backgroundColor: backgroundColors,
          borderColor: borderColors,
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            labels: {
              color: 'white',
            }
          }
        }
      }
    });
  }
}  