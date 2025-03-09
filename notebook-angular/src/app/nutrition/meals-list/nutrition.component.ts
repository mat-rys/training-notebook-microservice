import { Component, OnInit, Input  } from '@angular/core';
import {  Meals } from './models/meals.model';
import {  Meal } from './models/meal.model';
import { Router } from '@angular/router';
import { AuthService } from '../../security-config/auth.service';
import { NutritionTip } from './models/advice.model';
import { NutritionTipService } from '../services/nutrition-tip.service';
import { MealsService } from '../services/meals.service';
import { Limits } from '../limits/models/limits.model';
import { LimitsNutritionService } from '../services/limits-nutrition.service';


@Component({
  selector: 'app-nutrition',
  templateUrl: './nutrition.component.html',
  styleUrls: ['./nutrition.component.css']
})
export class NutritionComponent implements OnInit {
  imageUrl: string | null = null;
  limits!: Limits;

  meals: Meals[] = [];
  selectedDate: string = ''; 
  sortDirection: string = 'asc'; 
  successMessage: string = ''; 

  showMealFormAdd: boolean = false;
  showMealFormEdit: boolean = false;
  aiOpinionLoading: boolean = false;
  aiOpinion: string = '';

  idMeal!: number;
  editedMeal!: Meal;
  tips: NutritionTip[] = [];

  datesOfMealsForAi!: string;
  datesWithNotes: string[] = [];

  constructor(private authService: AuthService,  private router: Router, 
    private tipService: NutritionTipService, private mealsService: MealsService, private limitNutritionService:LimitsNutritionService) {}

    ngOnInit(): void {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0'); 
    const year = today.getFullYear();
    this.selectedDate = `${year}-${month}-${day}`
    this.loadMeals(this.selectedDate);
    this.loadRandomTip();
    this.loadDaysForMonth();
    this.loadLimitsProfile();
  }

  loadLimitsProfile(): void {
    this.limitNutritionService.loadLimitsProfile().subscribe(
      (data: Limits) => {
        this.limits = data; // Store limits in the component property
      },
      (error) => {
        console.error('Error loading limits:', error);
      }
    );
  }

  loadAiOpinion(): void {
    this.aiOpinionLoading = true;
    this.mealsService.generateAiMealsOpinion(this.selectedDate).subscribe(
      (response) => {
        this.aiOpinion = response.generation
          .replace(/(?<!^)(\d+\.)/g, '<br><strong>$1</strong>')  // Dodaje <br> i pogrubia każdą liczbę z wyjątkiem 1.
          .replace(/^(1\.)/, '<strong>1.</strong>')      // Pogrubia 1. i dodaje tekst "Balance: "
          .replace(/^(2\.)/, '<strong>2.</strong>')      // Pogrubia 2. i dodaje tekst "Pluses: "
          .replace(/^(3\.)/, '<strong>3.</strong>')     // Pogrubia 3. i dodaje tekst "Minuses: "
          .replace(/^(4\.)/, '<strong>4.</strong>') // Pogrubia 4. i dodaje tekst "Additional: "
          .replace(/(\d+\.)/g, '<br><strong>$1</strong>'); // Pogrubienie wszystkich numerów z kropką i dodanie <br>
        this.aiOpinionLoading = false;
      },
      (error) => {
        console.error(error);
        this.aiOpinionLoading = false;
      }
    );
  }

  loadDaysForMonth() {
    this.mealsService.getDistinctDays().subscribe(data => {
      this.datesWithNotes = data;
    });
}

  loadMeals(formattedDate: string) {
    this.meals = [];
    this.mealsService.loadMeals(formattedDate).subscribe((data) => {
      this.meals = data;
    });
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
  
  handleLogout(){
    this.authService.removeToken();
  }

  deleteMeal(id: number) {
    this.mealsService.deleteProductsForMeal(id).subscribe(
      () => {
        this.mealsService.deleteMeal(id).subscribe(
          () => {
            this.loadMeals(this.selectedDate);
            this.successMessage = 'Meal successfully deleted!';
            setTimeout(() => {this.successMessage = '';}, 800);
          },
          (error) => {console.error('Error with deleting meal:', error);}
        );
      },
      (error) => {
        if (error.status === 404) {
          this.mealsService.deleteMeal(id).subscribe(
            () => {
              this.loadMeals(this.selectedDate);
              this.successMessage = 'Meal successfully deleted!';
              setTimeout(() => {this.successMessage = '';}, 800);
            },
            (error) => {console.error('Error with deleting meal:', error);}
          );
        } else {
          console.error('Error with deleting products for meal:', error);
        }
      }
    );
  }

  copyMeal(meal: Meals) {
    const newDate = this.selectedDate; // Use the currently selected date
    const newMealTime = meal.mealTime; // You can allow changing the meal time if needed

    this.mealsService.copyMeal(meal.id, newDate, newMealTime).subscribe(
      (copiedMeal) => {
        this.loadMeals(this.selectedDate); // Refresh the meal list to show the new meal
        alert('Posiłek został skopiowany pomyślnie!');
      },
      (error) => {
        console.error('Błąd podczas kopiowania posiłku:', error);
        alert('Nie udało się skopiować posiłku.');
      }
    );
  }
 
toggleMealFormAdd() {
  this.showMealFormAdd = !this.showMealFormAdd;
  this.showMealFormEdit = false;
}

handleCreateMeal(meal: Meal) {
  this.mealsService.createMeal(meal).subscribe(
    (response) => {
      console.log('Meal has been created.');
      this.showMealFormAdd = false;
      this.loadMeals(this.selectedDate);
      this.loadDaysForMonth();
      this.successMessage = 'Meal successfully created!';
      setTimeout(() => {this.successMessage = '';}, 800);
    },
    (error) => {console.error('An error occurred while creating the meal.', error);}
  ); 
}

toggleMealFormEdit() {
  this.showMealFormEdit = !this.showMealFormEdit;
}

addProductsToMeal(mealId: number) {
  this.router.navigate(['/nutrition/meal-add-products'], { queryParams: { mealId: mealId } });
}

editMeal(meal: Meals) {
  this.editedMeal = {
    title: meal.title,
    day: new Date(meal.day),
    mealTime: meal.mealTime.slice(0, 5)
  };
  this.idMeal = meal.id;
  this.showMealFormEdit = !this.showMealFormEdit;
  this.showMealFormAdd = false;
}

handleEditMeal(editedMeal: Meal) {
  this.mealsService.updateMeal(this.idMeal, editedMeal).subscribe(
    (response) => {
      this.showMealFormEdit = false;
      this.loadMeals(this.selectedDate);
      this.successMessage = 'Meal successfully updated!';
      setTimeout(() => {this.successMessage = '';}, 800);
      },
    (error) => {console.error('An error occurred while updating the meal.', error);}
  );
}

onDateChanged(newDate: string) {
  this.selectedDate = newDate;
  this.loadMeals(this.selectedDate);
}
}
