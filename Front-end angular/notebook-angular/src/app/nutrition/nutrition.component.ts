import { Component, OnInit, Input  } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {  Meals } from './meals.model';
import {  Meal } from './meal.model';
import { formatDate } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-nutrition',
  templateUrl: './nutrition.component.html',
  styleUrls: ['./nutrition.component.css']
})
export class NutritionComponent implements OnInit {
  logoPath = 'assets\\Training Notebook-logos.png';
  ramenPhoto = 'assets\\ramen.jpg';
  meals: Meals[] = [];
  selectedDate: string = ''; // Przykład daty
  sortDirection: string = 'asc'; // Domyślnie sortuj rosnąco

  totalCalories: number = 0;
  totalFat: number = 0;
  totalCarbs: number = 0;
  totalProtein: number = 0;
  headers: HttpHeaders = new HttpHeaders();

  showMealForm: boolean = false;

  idMeal!: number;
  @Input() mealId: number = 0; // Initialize with a default value


  title: string = '';
  day!: Date; 
  mealTime!: string;
  token = this.authService.getToken();

  constructor(private authService: AuthService,private http: HttpClient, private router: Router) {}
  ngOnInit(): void {
    this.headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
    });

    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Miesiące są numerowane od 0, dlatego dodajemy 1
    const year = today.getFullYear();
    this.selectedDate = `${year}-${month}-${day}`
    this.loadMeals(this.selectedDate);
  }
  logout() {
    this.authService.removeToken();
  }

  loadMeals(formattedDate: string) {
    const url = `http://localhost:8222/nutrition/meals/${formattedDate}/userId`;

    this.http.get<Meals[]>(url, { headers: this.headers }).subscribe((data) => {
      this.meals = data;
      this.sortMealsByTime();
      this.calculateTotals();
    });
  }

  changeDate(offset: number) {
    const currentDate = new Date(this.selectedDate);
    currentDate.setDate(currentDate.getDate() + offset);
    this.selectedDate = currentDate.toISOString().split('T')[0];
    this.loadMeals(this.selectedDate);
  }

  calculateTotals() {
    this.totalCalories = this.meals.reduce((acc, meal) => acc + meal.calories, 0);
    this.totalFat = this.meals.reduce((acc, meal) => acc + meal.fat, 0);
    this.totalCarbs = this.meals.reduce((acc, meal) => acc + meal.carbs, 0);
    this.totalProtein = this.meals.reduce((acc, meal) => acc + meal.protein, 0);
  }

  sortMealsByTime() {
    this.meals.sort((a, b) => {
      if (this.sortDirection === 'asc') {
        return a.mealTime.localeCompare(b.mealTime);
      } else {
        return b.mealTime.localeCompare(a.mealTime);
      }
    });
  }

  deleteMeal(id: number) {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
    });

    this.http
      .delete(`http://localhost:8222/nutrition/meals/${id}`, { headers })
      .subscribe(
        () => {
          this.loadMeals(this.selectedDate);
        },
        (error) => {
          console.error('Błąd podczas usuwania posiłku:', error);
        }
      );
  }

  deleteMealConfirmation(id: number) {
    if (confirm('Czy na pewno chcesz usunąć ten posiłek?')) {
      this.deleteMeal(id);
    }
  }


toggleMealForm() {
  this.showMealForm = !this.showMealForm;
}


  createMeal(){
     const meal: Meal = {
      title: this.title,
      day: this.day,
      mealTime: this.mealTime
    };

    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`
    });

    this.http.post('http://localhost:8222/nutrition/meals', meal, { headers: headers })
      .subscribe(
        (response) => {
          console.log('Meal has been created.');
          this.showMealForm = false;
          this.loadMeals(this.selectedDate);
        },
        (error) => {
          console.error('An error occurred while creating the meal.', error);
        }
      ); 
      this.loadMeals(this.selectedDate);
  }
  
  addProductsToMeal(mealId: number) {
    this.router.navigate(['/meal-add-products'], { queryParams: { mealId: mealId } });
  }
 
  
}
