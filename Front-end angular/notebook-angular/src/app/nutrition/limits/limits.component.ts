import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/security-config/auth.service';
import { LimitsNutritionService } from '../services/limits-nutrition.service';
import { Limits } from './models/limits.model';
import { Chart, PieController, ArcElement, CategoryScale, Tooltip, Legend,LineController, LineElement, PointElement, LinearScale, Title } from 'chart.js';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

Chart.register(PieController, ArcElement, CategoryScale, Tooltip, Legend, LineController, LineElement, PointElement, LinearScale, Title);

@Component({
  selector: 'app-limits',
  templateUrl: './limits.component.html',
  styleUrls: ['./limits.component.css']
})
export class LimitsComponent implements OnInit {
  limits!: Limits;
  chart: any;
  showCaloriesInput = false;
  showCarbsInput = false;
  showFatsInput = false;
  showProteinsInput = false;

  private limitCaloriesSubject = new Subject<any>();
  private limitCarbsSubject = new Subject<any>();
  private limitFatsSubject = new Subject<any>();
  private limitProteinsSubject = new Subject<any>();

  constructor(private authService: AuthService, private limitService: LimitsNutritionService) {}

  ngOnInit(): void {
    this.loadLimitsProfile();

    this.limitCaloriesSubject.pipe(debounceTime(2200)).subscribe(updatedValue => {
      this.updateLimitsProfile('limitCalories', updatedValue);
    });
    this.limitCarbsSubject.pipe(debounceTime(2200)).subscribe(updatedValue => { 
      this.updateLimitsProfile('limitCarbs', updatedValue);
    });
    this.limitFatsSubject.pipe(debounceTime(2200)).subscribe(updatedValue => {
      this.updateLimitsProfile('limitFats', updatedValue);
    });
    this.limitProteinsSubject.pipe(debounceTime(2200)).subscribe(updatedValue => {
      this.updateLimitsProfile('limitProteins', updatedValue);
    });
  }
  
  handleLogout() {
    this.authService.removeToken();
  }

  loadLimitsProfile() {
    this.limitService.loadLimitsProfile().subscribe(
        data => {
            this.limits = data;
            console.log(data);
            this.createPieChart();
        },
        error => {
            if (error.status === 404) {
                const emptyLimitsProfile: Limits = {
                    limitCalories: 0,
                    limitCarbs: 0,
                    limitFats: 0,
                    limitProteins: 0
                };
                this.createLimitsProfile(emptyLimitsProfile);
            }
        }
    );
  }
  
  setColor(color: string) {
  }

  createLimitsProfile(limitsProfile: Limits) {
    this.limitService.createLimits(limitsProfile).subscribe(() => {
      this.loadLimitsProfile();
    });
  }
  
  updateLimitsProfile(fieldName: string, updatedValue: any) {
    if (fieldName === 'limitCalories') {
      const updatedCalories = updatedValue;
      const updatedCarbs = (updatedCalories * 0.5) / 4;
      const updatedFats = (updatedCalories * 0.25) / 9;
      const updatedProteins = (updatedCalories * 0.25) / 4;
  
      this.limitService.updateLimitsProfile('limitCalories', updatedValue).subscribe(() => {
        this.limitService.updateLimitsProfile('limitCarbs', updatedCarbs).subscribe(() => {
          this.limitService.updateLimitsProfile('limitFats', updatedFats).subscribe(() => {
            this.limitService.updateLimitsProfile('limitProteins', updatedProteins).subscribe(() => {
              this.loadLimitsProfile();
              this.hideInput(fieldName);
            });
          });
        });
      });
    } else {
      this.limitService.updateLimitsProfile(fieldName, updatedValue).subscribe(() => {
        this.loadLimitsProfile();
        this.hideInput(fieldName);
      });
    }
  }

  onInputChange(fieldName: string, updatedValue: any) {
    switch(fieldName) {
      case 'limitCalories':
        this.limitCaloriesSubject.next(updatedValue);
        break;
      case 'limitCarbs':
        this.limitCarbsSubject.next(updatedValue);
        break;
      case 'limitFats':
        this.limitFatsSubject.next(updatedValue);
        break;
      case 'limitProteins':
        this.limitProteinsSubject.next(updatedValue);
        break;
    }
  }


  hideInput(limitName: string) {
    switch (limitName) {
        case 'limitCalories':
            this.showCaloriesInput = false;
            break;
        case 'limitCarbs':
            this.showCarbsInput = false;
            break;
        case 'limitFats':
            this.showFatsInput = false;
            break;
        case 'limitProteins':
            this.showProteinsInput = false;
            break;
    }
  }

  showInput(limitName: string) {
    this.showCaloriesInput = limitName === 'calories';
    this.showCarbsInput = limitName === 'carbs';
    this.showFatsInput = limitName === 'fats';
    this.showProteinsInput = limitName === 'proteins';
  }

  createPieChart() {
    const labels = ['Fat', 'Protein', 'Carbs'];
    const data = [this.limits.limitFats, this.limits.limitProteins, this.limits.limitCarbs];
    

    const total = data.reduce((a, b) => a + b, 0);
    const percentageData = data.map(value => (value / total * 100).toFixed(2));
    
    const backgroundColors = labels.map(() => `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)},
     ${Math.floor(Math.random() * 255)}, 0.9)`); 
    const borderColors = backgroundColors.map((color: string) => color.replace('0.9', '1'));
    
    this.chart = new Chart('canvas', {
      type: 'pie',
      data: {
        labels: labels,
        datasets: [{
          data: percentageData,  
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
              label: function(context) {
                let label = context.label;
                let value = context.parsed;
                return `${label}: ${value}%`;  
              }
            }
          }
        }
      }
    });
  }    
}
