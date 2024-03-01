import { Component, OnInit, Input  } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {  Meals } from './models/meals.model';
import {  Meal } from './models/meal.model';
import { Router } from '@angular/router';
import { AuthService } from '../../security-config/auth.service';
import { NutritionTip } from './models/advice.model';
import { NutritionTipService } from '../services/nutrition-tip.service';
import { MealsService } from '../services/meals.service';


@Component({
  selector: 'app-nutrition',
  templateUrl: './nutrition.component.html',
  styleUrls: ['./nutrition.component.css']
})
export class NutritionComponent implements OnInit {
  logoPath = 'assets\\Training Notebook-logos.png';
  ramenPhoto = 'assets\\ramen.jpg';
  imageUrl: string | null = null;

  meals: Meals[] = [];
  selectedDate: string = ''; 
  sortDirection: string = 'asc'; 
  totalCalories: number = 0;
  totalFat: number = 0;
  totalCarbs: number = 0;
  totalProtein: number = 0;
  headers: HttpHeaders = new HttpHeaders();
  successMessage: string = ''; 

  showMealFormAdd: boolean = false;
  showMealFormEdit: boolean = false;

  idMeal!: number;
  @Input() mealId: number = 0; 

  title: string = '';
  day!: Date; 
  mealTime!: string;
  token = this.authService.getToken();
  tips: NutritionTip[] = [];

  constructor(private authService: AuthService,private http: HttpClient, 
    private router: Router, private tipService: NutritionTipService, private mealsService: MealsService) {}

  ngOnInit(): void {
    this.headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
    });

    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0'); 
    const year = today.getFullYear();
    this.selectedDate = `${year}-${month}-${day}`
    this.loadMeals(this.selectedDate);
    this.loadRandomTip();
  }

  loadRandomTip() {
    this.tipService.getRandomSortedNutritionTip().subscribe(randomTip => {
      this.tips = [randomTip]; 
    });
    this.loadRandomImage();
  }

  loadRandomImage() {
    this.imageUrl = this.tipService.getRandomImage();
  }
  

  logout() {
    this.authService.removeToken();
  }

  loadMeals(formattedDate: string) {
    this.meals = [];
    this.mealsService.loadMeals(formattedDate).subscribe((data) => {
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

  changeDateFromInput() {
    const inputDate = new Date(this.selectedDate);
    this.loadMeals(inputDate.toISOString().split('T')[0]);
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
    this.mealsService.deleteProductsForMeal(id).subscribe(
      () => {
        this.mealsService.deleteMeal(id).subscribe(
          () => {
            this.loadMeals(this.selectedDate);
            this.successMessage = 'Meal successfully deleted!';
            setTimeout(() => {
              this.successMessage = '';
            }, 800);
          },
          (error) => {
            console.error('Error with deleting meal:', error);
          }
        );
      },
      (error) => {
        if (error.status === 404) {
          this.mealsService.deleteMeal(id).subscribe(
            () => {
              this.loadMeals(this.selectedDate);
              this.successMessage = 'Meal successfully deleted!';
              setTimeout(() => {
                this.successMessage = '';
              }, 800);
            },
            (error) => {
              console.error('Error with deleting meal:', error);
            }
          );
        } else {
          console.error('Error with deleting products for meal:', error);
        }
      }
    );
  }

  deleteMealConfirmation(id: number) {
    if (confirm('Are you sure you want to remove the meal??')) {
      this.deleteMeal(id);
    }
  }


toggleMealFormAdd() {
  this.showMealFormAdd = !this.showMealFormAdd;
  this.showMealFormEdit = false;
}

createMeal() {
  const selectedTime = this.mealTime.split(':');

  this.mealTime = `${selectedTime[0]}:${selectedTime[1]}:00`;

  const meal: Meal = {
    title: this.title,
    day: this.day,
    mealTime: this.mealTime
  };

  this.mealsService.createMeal(meal).subscribe(
    (response) => {
      console.log('Meal has been created.');
      this.showMealFormAdd = false;
      this.loadMeals(this.selectedDate);
      this.successMessage = 'Meal successfully created!';
      setTimeout(() => {
        this.successMessage = '';
      }, 800);
    },
    (error) => {
      console.error('An error occurred while creating the meal.', error);
    }
  ); 
}
 
  addProductsToMeal(mealId: number) {
    this.router.navigate(['/nutrition/meal-add-products'], { queryParams: { mealId: mealId } });
  }

  editMeal(meal: Meals) {
    this.title = meal.title;
    this.day = new Date(meal.day);
    this.mealTime = meal.mealTime.slice(0, 5); 

    console.log(this.day)
  
    this.idMeal = meal.id;

    this.showMealFormEdit = !this.showMealFormEdit;
    this.showMealFormAdd = false
  }

  updateDay(event: any) {
    const selectedDate = new Date(event);
    if (!isNaN(selectedDate.getTime())) {
      this.day = selectedDate;
    } else {
      alert('Please select a valid date.');
    }
  }
  
  submitEditedMeal() {
    if (!this.day || !this.mealTime) {
      alert('Please fill in all fields.');
      return;
    }
  
    const mealId = this.idMeal;
    const selectedTime = this.mealTime.split(':');
    const updatedMealTime = `${selectedTime[0]}:${selectedTime[1]}:00`;
  
    const updatedData: Meal = {
      title: this.title,
      day: this.day,
      mealTime: updatedMealTime
    };
  
    this.mealsService.updateMeal(mealId, updatedData).subscribe(
      (response) => {
        console.log('Meal has been updated.');
        this.showMealFormEdit = false;
        this.loadMeals(this.selectedDate);
        this.successMessage = 'Meal successfully updated!';
        setTimeout(() => {
          this.successMessage = '';
        }, 800);
      },
      (error) => {
        console.error('An error occurred while updating the meal.', error);
      }
    );
  }
  
  toggleMealFormEdit() {
    this.showMealFormEdit = !this.showMealFormEdit;
  }
  
 
  
}
