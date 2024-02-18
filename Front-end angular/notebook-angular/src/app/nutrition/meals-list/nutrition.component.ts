import { Component, OnInit, Input  } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {  Meals } from './meals.model';
import {  Meal } from './meal.model';
import { formatDate } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../security-config/auth.service';
import { NutritionTip } from '../meals-list/advices/advice.model';
import { NutritionTipService } from '../meals-list/services/nutrition-tip.service';


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
  selectedDate: string = ''; // Przykład daty
  sortDirection: string = 'asc'; // Domyślnie sortuj rosnąco

  totalCalories: number = 0;
  totalFat: number = 0;
  totalCarbs: number = 0;
  totalProtein: number = 0;
  headers: HttpHeaders = new HttpHeaders();
  successMessage: string = ''; // Dodaj zmienną do obsługi komunikatu o sukcesie

  showMealFormAdd: boolean = false;
  showMealFormEdit: boolean = false;

  idMeal!: number;
  @Input() mealId: number = 0; // Initialize with a default value


  title: string = '';
  day!: Date; 
  mealTime!: string;
  token = this.authService.getToken();
  tips: NutritionTip[] = [];

  constructor(private authService: AuthService,private http: HttpClient, private router: Router, private tipService: NutritionTipService) {}

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
    this.loadRandomTip();
  }

  loadRandomTip() {
    this.tipService.getRandomSortedNutritionTip().subscribe(randomTip => {
      this.tips = [randomTip]; // Umieść losową poradę w tablicy, aby można ją było użyć w szablonie
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
    const url = `http://localhost:8222/nutrition/meals/${formattedDate}/userId`;

    this.http.get<Meals[]>(url, { headers: this.headers }).subscribe((data) => {
      this.meals = data;
      this.sortMealsByTime();
      this.calculateTotals();
    });

    console.log(this.meals)
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
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
    });

    // Najpierw usuń wszystkie produkty przypisane do danego posiłku
    this.http.delete(`http://localhost:8222/nutrition/products-meals/delete-by-meal/${id}`, { headers })
      .subscribe(
        () => {
          // Następnie usuń sam posiłek
          this.http.delete(`http://localhost:8222/nutrition/meals/${id}`, { headers })
            .subscribe(
              () => {
                this.loadMeals(this.selectedDate);
                this.successMessage = 'Meal successfully deleted!'; // Ustaw komunikat o sukcesie
                setTimeout(() => {
                  this.successMessage = ''; // Schowaj komunikat po 0.1 sekundy
                }, 800);
              },
              (error) => {
                console.error('Error with deleting meal:', error);
              }
            );
        },
        (error) => {
          if (error.status === 404) {
            // Jeśli nie ma produktów przypisanych do danego posiłku, przejdź bezpośrednio do usuwania samego posiłku
            this.http.delete(`http://localhost:8222/nutrition/meals/${id}`, { headers })
              .subscribe(
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
  
  // Dodaj ":00" jako sekundy do godziny i minuty
  this.mealTime = `${selectedTime[0]}:${selectedTime[1]}:00`;

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
        this.showMealFormAdd = false;
        this.loadMeals(this.selectedDate);
        this.successMessage = 'Meal successfully created!'; // Ustaw komunikat o sukcesie
        setTimeout(() => {
          this.successMessage = ''; // Schowaj komunikat po 0.1 sekundy
        }, 800);
      },
      (error) => {
        console.error('An error occurred while creating the meal.', error);
      }
    ); 
}

  
  addProductsToMeal(mealId: number) {
    this.router.navigate(['/meal-add-products'], { queryParams: { mealId: mealId } });
  }

  editMeal(meal: Meals) {

    
    // Przypisz wartości pól formularza do właściwości obiektu posiłku
    this.title = meal.title;
    this.day = new Date(meal.day);
    this.mealTime = meal.mealTime.slice(0, 5); 

    console.log(this.day)
  
    // Przypisz id posiłku, który chcemy edytować, do właściwości idMeal
    this.idMeal = meal.id;
  
    // Pokaż formularz edycji posiłku
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
    
    console.log(this.day)
    const mealId = this.idMeal;
  
    const selectedTime = this.mealTime.split(':');
  
    const updatedMealTime = `${selectedTime[0]}:${selectedTime[1]}:00`;
  
    // Utwórz obiekt zaktualizowanych danych posiłku
    const updatedData: Meal = {
      title: this.title,
      day: this.day,
      mealTime: updatedMealTime
    };
  
    // Wyślij żądanie PUT do backendu z zaktualizowanymi danymi posiłku
    this.http.put(`http://localhost:8222/nutrition/meals/mealEdit/${mealId}`, updatedData, { headers: this.headers })
      .subscribe(
        (response) => {
          console.log('Meal has been updated.');
          this.showMealFormEdit = false;
          this.loadMeals(this.selectedDate);
          this.successMessage = 'Meal successfully updated!'; // Ustaw komunikat o sukcesie
          setTimeout(() => {
            this.successMessage = ''; // Schowaj komunikat po 0.1 sekundy
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
