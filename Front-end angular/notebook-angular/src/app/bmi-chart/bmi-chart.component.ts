import { Component, OnInit } from '@angular/core';
import { AuthService } from '../security-config/auth.service';


@Component({
  selector: 'app-bmi-chart',
  templateUrl: './bmi-chart.component.html',
  styleUrls: ['./bmi-chart.component.css']
})
export class BmiChartComponent implements OnInit {
  logoPath = "assets\\Training Notebook-logos.png";
  yogaPhotoPath = "assets\\diet.jpg";
  
  updateTimeout: any;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  logout() {
    this.authService.removeToken();
  }

  // Dodaj zmienne do przechowywania wyników BMI
  weight: number | null = null;
  height: string | null = null;
  bmiResult: number | null = null;
  bmrResult: number | null = null;

  weightBMR: number | null = null;
  heightBMR: number | null = null;
  age: number | null = null;
  selectedGender: string | null = null; // Zmienna do przechowywania wybran

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

  // Funkcja wywoływana po zmianie danych wejściowych
  onInputChange() {
    clearTimeout(this.updateTimeout);
    this.updateTimeout = setTimeout(() => {
      this.calculateBMI(this.weight, this.height);
      this.calculateBMR(this.weightBMR, this.heightBMR, this.age, this.selectedGender);
    }, 500); // Oczekujemy 0.5 sekundy po zakończeniu wprowadzania danych
  }
}
