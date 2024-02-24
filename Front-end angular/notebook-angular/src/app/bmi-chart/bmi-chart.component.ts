import { Component, OnInit } from '@angular/core';
import { AuthService } from '../security-config/auth.service';


@Component({
  selector: 'app-bmi-chart',
  templateUrl: './bmi-chart.component.html',
  styleUrls: ['./bmi-chart.component.css']
})
export class BmiChartComponent implements OnInit {
  updateTimeout: any;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  handleLogout() {
    this.authService.removeToken();
  }

 
  weight: number | null = null;
  height: string | null = null;
  bmiResult: number | null = null;
  bmrResult: number | null = null;

  weightBMR: number | null = null;
  heightBMR: number | null = null;
  age: number | null = null;
  selectedGender: string | null = null; 

   waist: number | null = null;
   hips: number | null = null;
   neck: number | null = null;
   heightBodyFat: number | null = null;
   genderBodyFat: string | null = null;
   bodyFatResult: number | null = null;
   selectedGenderBodyFat: string | null = null;


  calculateBMI(weight: number | null, height: string | null) {
    if (weight !== null && height !== null && weight > 0 && parseFloat(height) > 0) {
      const heightInMeters = parseFloat(height) / 100;
      const bmi = weight / (heightInMeters * heightInMeters);
      this.bmiResult = parseFloat(bmi.toFixed(2));
    } else {
      this.bmiResult = null;
    }
  }

  // Funkcja do obliczania BMR i wyświetlania wyniku
  calculateBMR(weight: number | null, height: number | null, age: number | null, gender: string | null) {
    if (weight !== null && height !== null && age !== null && gender !== null && weight > 0 && height > 0 && age > 0) {
      // Konwersja wzrostu z centymetrów na metry
      const heightInMeters = height / 100;

      let bmr: number;
      if (gender === 'male') {
        bmr = 850 + (13.397 * weight) + (5 * heightInMeters) - (5 * age);
      } else {
        bmr = 800 + (11.1 * weight) + (2 * heightInMeters) - (5 * age);
      }
      this.bmrResult = bmr;
    } else {
      this.bmrResult = null;
    }
  }

  calculateBodyFat(waist: number | null, hips: number | null, neck: number | null, heightBodyFat: number | null, genderBodyFat: string | null) {
    if (waist !== null && hips !== null && neck !== null && heightBodyFat !== null && genderBodyFat !== null) {
      let bodyFatPercentage: number;
      if (genderBodyFat === 'male') {
        bodyFatPercentage = 495 / (1.0324 - 0.19077 * Math.log10(waist - neck) + 0.15456 * Math.log10(heightBodyFat)) - 450;
      } else {
        bodyFatPercentage = 495 / (1.29579 - 0.35004 * Math.log10(waist + hips - neck) + 0.22100 * Math.log10(heightBodyFat)) - 450;
      }
      this.bodyFatResult = bodyFatPercentage;
    } else {
      this.bodyFatResult = null;
    }
  }

onInputChange() {
  clearTimeout(this.updateTimeout);
  this.updateTimeout = setTimeout(() => {
    this.calculateBMI(this.weight, this.height);
    this.calculateBMR(this.weightBMR, this.heightBMR, this.age, this.selectedGender);
    this.calculateBodyFat(this.waist, this.hips, this.neck, this.heightBodyFat, this.selectedGenderBodyFat); 
  }, 500);
}

}
