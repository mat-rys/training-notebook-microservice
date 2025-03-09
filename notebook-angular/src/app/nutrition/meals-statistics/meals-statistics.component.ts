import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/security-config/auth.service';
import { NutritionStatisticsService } from '../services/nutrition-statistics.service';

import {
  Chart,
  PieController,
  ArcElement,
  CategoryScale,
  Tooltip,
  Legend,
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  BarController,
  BarElement,
  Plugin
} from 'chart.js';
import { AccountService } from 'src/app/user-profile/account/services/account-data.service';
import { Body } from './models/body-profil.model';

// Registering necessary components for Chart.js
Chart.register(
  PieController,
  ArcElement,
  CategoryScale,
  Tooltip,
  Legend,
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  BarController,
  BarElement
);

@Component({
  selector: 'app-meals-statistics',
  templateUrl: './meals-statistics.component.html',
  styleUrls: ['./meals-statistics.component.css']
})
export class MealsStatisticsComponent implements OnInit {
  options = [
    'Najczęściej używane produkty w wybranym okresie',
    'Średnia wartość odżywcza w wybranym okresie',
    'Dzienne kalorie w wybranym okresie',
    'Dzienny rozkład składników odżywczych w wybranym okresie (%)',
    'Posiłki w różnych porach dnia w wybranym okresie'
  ];
  
  selectedOption!: string;
  statistics: any;
  startDate!: string;
  endDate!: string;
  chart: any;

  bodyProfile: Body | undefined; // Zmienna do przechowywania profilu ciała
  aiAdvice: string | undefined; // To hold the generated advice
  aiLoading: boolean = false; // To manage loading state for AI advice
  backgroundClass: string = ''; // To manage background color class

  constructor(
    private authService: AuthService,
    private router: Router,
    private nutritionStatsService: NutritionStatisticsService,
    private accountService: AccountService
  ) {}

  ngOnInit(): void {
    const today = new Date();
    const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    this.startDate = firstDayOfMonth.toISOString().split('T')[0]; 
    this.endDate = today.toISOString().split('T')[0]; 
    this.loadBodyProfile(); 
  }
  

  generateAdvice(): void {
    if (this.selectedOption && this.statistics && this.bodyProfile) {
        this.aiLoading = true;
        const personalInfo = JSON.stringify(this.bodyProfile); // Serializowanie profilu ciała
        const statistics = JSON.stringify(this.statistics); // Serializowanie statystyk

        // Ustawienie komunikatu informującego o rozpoczęciu generowania porady
        this.aiAdvice = 'Zaczynam generować poradę na temat posiłków...'; // Ustawienie komunikatu
        this.backgroundClass = 'generating'; // Dodanie klasy do zmiany tła

        this.nutritionStatsService.generateAdvice(statistics, personalInfo).subscribe({
            next: (response) => {
                this.aiAdvice = response.generation; // Ustawianie wygenerowanej porady
                this.aiLoading = false; // Resetowanie stanu ładowania
                this.backgroundClass = 'generated'; // Zmiana klasy po wygenerowaniu
            },
            error: (error) => {
                console.error('Error generating advice:', error);
                this.aiAdvice = 'Wystąpił błąd podczas generowania porady.'; // Ustawienie komunikatu o błędzie
                this.aiLoading = false; // Resetowanie stanu ładowania
                this.backgroundClass = ''; // Resetowanie klasy
            }
        });
    } else {
        console.warn('Proszę wybrać statystyki i upewnić się, że profil jest załadowany.'); // Komunikat w konsoli
        this.aiAdvice = 'Proszę wybrać statystyki i upewnić się, że profil jest załadowany.'; // Komunikat dla użytkownika
        this.backgroundClass = ''; // Resetowanie klasy
    }
  }

  handleLogout() {
    this.authService.removeToken();
  }

  loadBodyProfile(): void {
    this.accountService.loadBodyProfil().subscribe({
      next: (body: Body) => {
        this.bodyProfile = body; // Zapisz pobrany profil ciała
        console.log(this.bodyProfile); // Możesz wyświetlić profil ciała w konsoli
      },
      error: (err) => {
        console.error('Błąd podczas ładowania profilu ciała:', err); // Obsługa błędów
      }
    });
  }

  loadStatistics() {
    switch (this.selectedOption) {
      case 'Najczęściej używane produkty w wybranym okresie':
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
      case 'Średnia wartość odżywcza w wybranym okresie':
        if (this.startDate && this.endDate) {
          this.nutritionStatsService.getAverageNutrients(this.startDate, this.endDate).subscribe(
            data => {
              this.statistics = data[0];
              console.log('Average statistics:', data);
              this.createPieChartForAverage('Average statistics');
            },
            error => {
              console.error('Error:', error);
            }
          );
        }
        break;
      case 'Dzienne kalorie w wybranym okresie':
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
      case 'Dzienny rozkład składników odżywczych w wybranym okresie (%)':
        if (this.startDate && this.endDate) {
          this.nutritionStatsService.getMealStatsByDayInPercentage(this.startDate, this.endDate).subscribe(
            data => {
              this.statistics = data;
              console.log('Nutrient distribution stats:', data);
              this.createBarChart('Rozkład składników odżywczych (%)');
            },
            error => {
              console.error('Error fetching nutrient distribution stats:', error);
            }
          );
        }
        break;
      case 'Posiłki w różnych porach dnia w wybranym okresie':
        if (this.startDate && this.endDate) {
          this.nutritionStatsService.getMealTimesStats(this.startDate, this.endDate).subscribe(
            data => {
              this.statistics = data[0]; // Assume backend returns one object
              console.log('Meal times statistics:', data);
              this.createBarChartForMealTimes('Meal Times Statistics');
            },
            error => {
              console.error('Error fetching meal times statistics:', error);
            }
          );
        }
        break;
    }
  }

  createBarChartForMealTimes(chartType: string) {
    if (this.chart) {
        this.chart.destroy(); // Destroy the previous chart if it exists
    }

    // Update labels to include time intervals in Polish
    const labels = [
        'Śniadania (5-11)',     // Breakfast (5 AM to 7 AM)
        'Obiady (11-17)',      // Lunch (11 AM to 4 PM)
        'Kolacje (17-21)',     // Dinner (5 PM to 9 PM)
        'Późne kolacje (21-5)' // Late Dinner (9 PM to 5 AM)
    ];
    
    const data = [
        this.statistics.morningMeals,
        this.statistics.afternoonMeals,
        this.statistics.eveningMeals,
        this.statistics.nightMeals
    ];

    const backgroundColors = [
        'rgba(255, 223, 186, 0.9)', // Śniadanie: light orange (sunrise)
        'rgba(255, 255, 153, 0.9)', // Obiad: light yellow (sunshine)
        'rgba(153, 204, 255, 0.9)', // Kolacja: light blue (sunset)
        'rgba(102, 102, 153, 0.9)'   // Późna kolacja: dark purple (night sky)
    ];

    const borderColors = backgroundColors.map(color => color.replace('0.9', '1'));

    const images: { [key: string]: HTMLImageElement } = {
        'Śniadania (5-11)': new Image(),
        'Obiady (11-17)': new Image(),
        'Kolacje (17-21)': new Image(),
        'Późne kolacje (21-5)': new Image()
    };

    // Add paths to images (emojis in assets)
    images['Śniadania (5-11)'].src = 'assets/morning.png';
    images['Obiady (11-17)'].src = 'assets/afternoon.png';
    images['Kolacje (17-21)'].src = 'assets/evening.png';
    images['Późne kolacje (21-5)'].src = 'assets/night.png';

    // Wait for all images to load before creating the chart
    Promise.all(Object.values(images).map(image => new Promise((resolve) => {
        image.onload = resolve;
    }))).then(() => {
        this.chart = new Chart('canvas', {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Liczba posiłków', // Number of Meals in Polish
                    data: data,
                    backgroundColor: backgroundColors,
                    borderColor: borderColors,
                    borderWidth: 1,
                    barThickness: 200, // Set bar thickness to make it narrower
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    x: {
                        type: 'category', // Ensure x scale is of type category
                        ticks: {
                            autoSkip: false // Prevent automatic skipping of ticks
                        },
                        grid: {
                            display: true // Optional: display grid lines
                        },
                        stacked: false // Optional: if you want to stack bars
                    },
                    y: {
                        beginAtZero: true
                    }
                },
                plugins: {
                    legend: {
                        labels: {
                            color: 'white'
                        }
                    }
                }
            },
            plugins: [
                {
                    id: 'barWithImages',
                    beforeDraw: (chart) => {
                        const ctx = chart.ctx;
                        chart.data.datasets.forEach((dataset, i) => {
                            const meta = chart.getDatasetMeta(i);
                            meta.data.forEach((bar, index) => {
                                // Check if labels are defined and access safely
                                const labels = chart.data.labels;
                                if (labels && labels[index]) {
                                    const label = labels[index] as string; // Assert label to string
                                    const image = images[label]; // TypeScript knows this will work due to our defined type
                                    if (image && image.complete) {
                                        // Adjust the size of the images here (e.g., 40x40)
                                        ctx.drawImage(image, bar.x - 20, bar.y - 40, 40, 40); // Draw image with larger size
                                    }
                                }
                            });
                        });
                    }
                }
            ]
        });
    });
}


    
    

    createLineChart(chartType: string) {
      if (this.chart) {
        this.chart.destroy();
      }
    
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
            label: 'Kalorie',
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
                text: 'Data (YYYY-MM-DD)',
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
                text: 'Kalorie',
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

    if (this.chart) {
      this.chart.destroy();
    }
    
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

  createPieChartForAverage(chartType: string) {
    if (this.chart) {
        this.chart.destroy();
    }
    
    let labels: string[];
    let data: number[];
    if (chartType === 'Najczęściej używane produkty') {
        labels = this.statistics.map((stat: any) => stat.title);
        data = this.statistics.map((stat: any) => stat.count);
    } else { 
        labels = ['Tłuszcz', 'Białko', 'Węglowodany'];
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
                },
                tooltip: {
                    callbacks: {
                        label: (tooltipItem) => {
                            const value = tooltipItem.raw; // Zapisz wartość
                            const label = tooltipItem.label; // Zapisz etykietę
                            return `${label}: ${value} g`; // Zwróć etykietę z wartością i "g"
                        }
                    }
                }
            }
        }
    });
}


createBarChart(chartType: string) {
  if (this.chart) {
      this.chart.destroy();
  }

  let labels: string[];
  let fatData: number[];
  let carbsData: number[];
  let proteinData: number[];

  if (chartType === 'Rozkład składników odżywczych (%)') {
      labels = this.statistics.map((stat: any) => new Date(stat.day).toISOString().split('T')[0]);
      fatData = this.statistics.map((stat: any) => Math.round(stat.procentFat * 100) / 100);
      carbsData = this.statistics.map((stat: any) => Math.round(stat.procentCarbs * 100) / 100);
      proteinData = this.statistics.map((stat: any) => Math.round(stat.procentProtein * 100) / 100);

      this.chart = new Chart('canvas', {
          type: 'bar',
          data: {
              labels: labels,
              datasets: [
                  {
                      label: 'Tłuszcz (%)',
                      data: fatData,
                      backgroundColor: 'rgba(255, 255, 0, 0.6)',
                      borderColor: 'rgba(255, 255, 0, 1)',
                      borderWidth: 1
                  },
                  {
                      label: 'Węglowodany (%)',
                      data: carbsData,
                      backgroundColor: 'rgba(255, 99, 71, 0.6)',
                      borderColor: 'rgba(255, 99, 71, 1)',
                      borderWidth: 1
                  },
                  {
                      label: 'Białko (%)',
                      data: proteinData,
                      backgroundColor: 'rgba(75, 192, 192, 0.6)',
                      borderColor: 'rgba(75, 192, 192, 1)',
                      borderWidth: 1
                  }
              ]
          },
          options: {
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                  legend: {
                      labels: {
                          color: 'white',
                      }
                  },
                  tooltip: {
                      callbacks: {
                          label: function(tooltipItem) {
                              return [`${tooltipItem.dataset.label}: ${tooltipItem.raw}%`];
                          }
                      }
                  }
              },
              scales: {
                  x: {
                      display: true,
                      title: {
                          display: true,
                          text: 'Data (YYYY-MM-DD)',
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
                          text: 'Procent (%)',
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
}
}  