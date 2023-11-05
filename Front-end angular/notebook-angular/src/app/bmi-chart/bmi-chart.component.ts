import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-bmi-chart',
  templateUrl: './bmi-chart.component.html',
  styleUrls: ['./bmi-chart.component.css']
})
export class BmiChartComponent implements OnInit {
  logoPath = "assets\\Training Notebook-logos.png";
  yogaPhotoPath = "assets\\diet.jpg";

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
      bmr = 88.362 + (13.397 * weight) + (4.799 * heightInMeters) - (5.677 * age);
    } else {
      bmr = 447.593 + (9.247 * weight) + (3.098 * heightInMeters) - (4.330 * age);
    }
    this.bmrResult = bmr;
  } else {
    this.bmrResult = null;
  }
}

}
