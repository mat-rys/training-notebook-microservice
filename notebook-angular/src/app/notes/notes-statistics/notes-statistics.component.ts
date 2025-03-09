import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../security-config/auth.service';
import { NoteStatisticsService } from '../services/note-statistics.service';
import { ActivityTypeCountDTO } from './models/activity-type-count.dto';
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
  BarElement
} from 'chart.js';
import { ActivityCountByWeekday } from './models/activity-count-by-weekday.model';
import { DailyNoteCountDTO } from './models/daily-note-count.dto';

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
  selector: 'app-notes-statistics',
  templateUrl: './notes-statistics.component.html',
  styleUrls: ['./notes-statistics.component.css'] // Poprawka do stylów
})
export class NotesStatisticsComponent implements OnInit {
  // Define the activityColors object
  activityColors: { [key: string]: string } = {
    "🏃‍♂️ Bieganie": 'rgba(255, 0, 0, 0.5)',
    "🏊‍♀️ Pływanie": 'rgba(0, 0, 255, 0.5)',
    "🚴‍♂️ Jazda na rowerze": 'rgba(0, 255, 0, 0.5)',
    "🏋️‍♂️ Siłownia": 'rgba(255, 165, 0, 0.5)',
    "🧘‍♀️ Joga": 'rgba(75, 192, 192, 0.5)',
    "⚽ Sporty drużynowe": 'rgba(75, 0, 130, 0.5)',
    "🎿 Narciarstwo/Snowboarding": 'rgba(255, 20, 147, 0.5)',
    "🧗‍♀️ Wspinaczka": 'rgba(255, 215, 0, 0.5)',
    "💃 Taniec": 'rgba(128, 0, 128, 0.5)',
    "🥋 Sztuki walki": 'rgba(255, 99, 132, 0.5)',
    "🥾 Wędrówki": 'rgba(255, 140, 0, 0.5)',
    "🎾 Tenis": 'rgba(0, 128, 0, 0.5)',
    "💪 CrossFit": 'rgba(50, 205, 50, 0.5)',
    "🤸‍♀️ Aerobik/Fitness": 'rgba(0, 191, 255, 0.5)',
    "🛹 Parkour/Skateboarding": 'rgba(139, 69, 19, 0.5)',
    "🎯 Inne": 'rgba(128, 128, 128, 0.5)',
  };

  constructor(private authService: AuthService, private noteStatisticsService: NoteStatisticsService) {}

  options = [
    'Najczęściej wybierane typy aktywności',
    'Aktywność według dni tygodnia',
    'Ilość notatek dziennie'
  ];
  
  selectedOption!: string;
  statistics: ActivityTypeCountDTO[] = [];
  weekdayStatistics: ActivityCountByWeekday[] = []; 
  dailyNoteCounts: DailyNoteCountDTO[] = []; 
  startDate!: string;
  endDate!: string;
  chart: any;

  ngOnInit(): void {
    const today = new Date();
    const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    this.startDate = firstDayOfMonth.toISOString().split('T')[0];

    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1); // Ustaw dzień na jutro
    this.endDate = tomorrow.toISOString().split('T')[0]; // Ustawienie endDate
  }
  
  handleLogout() {
    this.authService.removeToken();
  }
  
  loadStatistics(): void {
    if (this.startDate && this.endDate) {
      const fromDate = new Date(this.startDate);
      const toDate = new Date(this.endDate);

      switch (this.selectedOption) {
        case 'Najczęściej wybierane typy aktywności':
          this.noteStatisticsService.getActivityStatistics(fromDate, toDate).subscribe(
            (data: ActivityTypeCountDTO[]) => {
              this.statistics = data;
              this.createBarChart(); // Tworzenie wykresu na podstawie pobranych danych
            },
            (error) => {
              console.error('Error fetching activity statistics:', error);
            }
          );
          break;

        case 'Aktywność według dni tygodnia': // Nowa opcja
          this.noteStatisticsService.getActivityCountsByWeekday(fromDate, toDate).subscribe(
            (data: ActivityCountByWeekday[]) => {
              this.weekdayStatistics = data;
              this.createWeekdayChart(); // Tworzenie wykresu na podstawie pobranych danych
            },
            (error) => {
              console.error('Error fetching activity counts by weekday:', error);
            }
          );
          break;

          case 'Ilość notatek dziennie': // New case for daily note counts
          this.noteStatisticsService.getDailyNoteCounts(fromDate, toDate).subscribe(
            (data: DailyNoteCountDTO[]) => {
              this.dailyNoteCounts = data;
              this.createDailyNoteCountChart(); // Create a line chart for daily note counts
            },
            (error) => {
              console.error('Error fetching daily note counts:', error);
            }
          );
          break;

        default:
          console.warn('Nieznana opcja statystyki:', this.selectedOption);
      }
    }
  }

  createBarChart(): void {
    if (this.chart) {
      this.chart.destroy(); // Zniszcz poprzedni wykres, jeśli istnieje
    }
  
    const labels = this.statistics.map((stat: ActivityTypeCountDTO) => stat.activityType);
    const data = this.statistics.map((stat: ActivityTypeCountDTO) => stat.count);
  
    const datasets = [
      {
        label: 'Liczba wystąpień',
        data: data,
        backgroundColor: labels.map(label => this.activityColors[label] || 'rgba(200, 200, 200, 0.5)'), // Użycie kolorów dla każdego typu aktywności
        borderColor: labels.map(label => this.activityColors[label]?.replace(/0\.5/, '1') || 'rgba(200, 200, 200, 1)'), // Kolor obramowania
        borderWidth: 1
      }
    ];
  
    this.chart = new Chart('canvas', {
      type: 'bar',
      data: {
        labels: labels,
        datasets: datasets
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: true,
            labels: {
              color: 'white',
            }
          },
          tooltip: {
            callbacks: {
              label: function (tooltipItem: any) {
                return [`${tooltipItem.dataset.label}: ${tooltipItem.raw}`];
              }
            }
          }
        },
        scales: {
          x: {
            display: true,
            title: {
              display: true,
              text: 'Typ aktywności',
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
              text: 'Liczba wystąpień',
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
  

  createWeekdayChart(): void {
    if (this.chart) {
      this.chart.destroy(); // Zniszcz poprzedni wykres, jeśli istnieje
    }
  
    // Przygotowanie etykiet dla osi x (dni tygodnia)
    const labels = this.weekdayStatistics.map(stat => stat.dayOfWeek);
    
    // Zestaw danych dla wykresu
    const datasets: any[] = [];
  
    // Agregacja aktywności dla każdego dnia
    this.weekdayStatistics.forEach(stat => {
      const activities = stat.activities;
  
      // Iterowanie przez każdą aktywność i tworzenie wpisu w zestawie danych
      for (const [activityType, count] of Object.entries(activities)) {
        let dataset = datasets.find(ds => ds.label === activityType);
        if (!dataset) {
          dataset = {
            label: activityType,
            data: new Array(labels.length).fill(0), // Inicjalizuj dane z zerem dla każdego dnia
            backgroundColor: this.activityColors[activityType] || 'rgba(200, 200, 200, 0.5)', // Kolor tła
            borderColor: this.activityColors[activityType]?.replace(/0\.5/, '1') || 'rgba(200, 200, 200, 1)', // Kolor obramowania
            borderWidth: 1,
            // Ustawienia dla słupków
            barPercentage: 0.5, // Ustawia szerokość słupków na 50% domyślnej szerokości
            categoryPercentage: 0.5 // Ustawia szerokość grupy słupków na 50% domyślnej szerokości
          };
          datasets.push(dataset);
        }
        const dayIndex = labels.indexOf(stat.dayOfWeek);
        if (dayIndex !== -1) {
          dataset.data[dayIndex] += count; // Agregacja liczby dla tego samego typu aktywności w obrębie dni
        }
      }
    });
  
    // Tworzenie wykresu ze złożonymi zestawami danych
    this.chart = new Chart('canvas', {
      type: 'bar',
      data: {
        labels: labels,
        datasets: datasets
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: {
            stacked: true, // Włącz stosowanie dla osi x
            title: {
              display: true,
              text: 'Dzień tygodnia',
              color: 'white'
            },
            ticks: {
              color: 'white'
            }
          },
          y: {
            stacked: true, // Włącz stosowanie dla osi y
            title: {
              display: true,
              text: 'Liczba wystąpień',
              color: 'white'
            },
            ticks: {
              color: 'white'
            }
          }
        },
        plugins: {
          legend: {
            display: true,
            labels: {
              color: 'white',
            }
          },
          tooltip: {
            callbacks: {
              label: function (tooltipItem: any) {
                return [`${tooltipItem.dataset.label}: ${tooltipItem.raw}`];
              }
            }
          }
        }
      }
    });
  }
  
  createDailyNoteCountChart(): void {
    if (this.chart) {
      this.chart.destroy(); // Zniszcz poprzedni wykres, jeśli istnieje
    }
  
    // Sortowanie danych według daty
    this.dailyNoteCounts.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  
    // Generowanie etykiet i danych
    const labels = this.dailyNoteCounts.map((count) => new Date(count.date).toISOString().split('T')[0]);
    const data = this.dailyNoteCounts.map((count) => count.count);
  
    // Tworzenie wykresu na istniejącym elemencie canvas z id "canvas"
    this.chart = new Chart('canvas', {
      type: 'line',
      data: {
        labels: labels,
        datasets: [{
          label: 'Ilość notatek dziennie',
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
              text: 'Ilość notatek',
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
