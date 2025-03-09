import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/security-config/auth.service';
import { Product } from './model/product.model';
import { LimitsNutritionService } from './service/limits-nutrition.service';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { MealAdvice } from './model/meal-advice.model'; 
import { jsPDF } from 'jspdf';
import { Meal } from './model/meal.model';

@Component({
  selector: 'app-quick-meal-ideas',
  templateUrl: './quick-meal-ideas.component.html',
  styleUrls: ['./quick-meal-ideas.component.css']
})
export class QuickMealIdeasComponent implements OnInit {
  products: Product[] = [];
  selectedProducts: Product[] = [];
  filteredProducts: Product[] = [];
  filteredSelectedProducts: Product[] = [];
  searchProductsSubject: Subject<string> = new Subject();
  searchSelectedSubject: Subject<string> = new Subject();
  loading: boolean = false;
  hasGeneratedAdvice: boolean = false;
  additionalInfo: string = ''; 
  mealAdvice: string | null = null;
  isHealthy: boolean = false;
  selectedMealTime: string | null = null;
  allowAdditionalProducts: boolean = false;
  isAdvancedVisible: boolean = false;
  isSaving = false;

  isDialogOpen = false;  // Zmienna do kontrolowania widoczności okna dialogowego
  mealDate: Date | null = null;;
  mealTime: string | null = null;;

  // Nowe pola
  calories: number | null = null;
  minCarbs: number | null = null;
  maxCarbs: number | null = null;
  minProtein: number | null = null;
  maxProtein: number | null = null;
  minFat: number | null = null;
  maxFat: number | null = null;
  selectedMealTypes: string[] = [];

  mealTypes: string[] = [
    'Lekki',
    'Szybki',
    'Syty',
    'Keto',
    'Paleo',
    'Wegański',
    'Białkowy',
    'Niskowęglowodanowy',
    'Bezglutenowy',
    'Niskotłuszczowy',
    'Wysokotłuszczowy',
    'Śródziemnomorski',
    'Wegetariański',
    'Fit',
    'Domowy',
    'Słodki',
];

  constructor(
    private authService: AuthService, 
    private limitsNutritionService: LimitsNutritionService
  ) {}

  ngOnInit(): void {
    this.limitsNutritionService.loadProducts().subscribe((data: Product[]) => {
      this.products = data;
      this.filteredProducts = data; // Domyślnie wyświetl wszystkie produkty
    });

    this.searchProductsSubject.pipe(
      debounceTime(500),
      distinctUntilChanged()
    ).subscribe(searchText => {
      this.filterProducts(searchText);
    });

    this.searchSelectedSubject.pipe(
      debounceTime(500),
      distinctUntilChanged()
    ).subscribe(searchText => {
      this.filterSelectedProducts(searchText);
    });
  }

  openAddMealDialog() {
    this.isDialogOpen = true;
  }
  
  closeDialog() {
    this.isDialogOpen = false;
    this.isSaving = false; // Resetowanie flagi zapisywania
  }
  
  saveMeal() {
    this.isSaving = true; // Ustawienie isSaving na true przed zapytaniem
  
    if (!this.mealAdvice) {
      console.error("Brak porady o posiłku!");
      this.isSaving = false; // Resetowanie, gdy nie ma porady o posiłku
      return; // Zatrzymaj, jeśli nie ma porady
    }
  
    // Wyrażenia regularne do wydobywania danych
    const mealNameMatch = this.mealAdvice.match(/1# (.*?)\n/);  // Wydobycie tytułu
    const ingredientsMatch = this.mealAdvice.match(/3# Składniki:\s*([\s\S]*?)4# Przepis:/); // Wydobycie składników
  
    const mealTitle = mealNameMatch ? mealNameMatch[1].trim() : 'Nieznany posiłek'; // Wydobycie tytułu
    const ingredients = ingredientsMatch ? ingredientsMatch[1].trim().split('\n').map(ing => ing.trim()).join(', ') : ''; // Wydobycie składników
  
    // Ustal format daty i godziny
    const formattedDate = this.mealDate ? this.formatDate(this.mealDate) : new Date().toISOString().slice(0, 19).replace('T', ' '); // Data i godzina
    const formattedTime = this.mealTime ? this.mealTime + ':00' : new Date().toLocaleTimeString('pl-PL', { hour12: false }).slice(0, 8); // Godzina
  
    const mealData: Meal = {
      title: mealTitle, // Tytuł z meal advice
      day: formattedDate, // Użyj sformatowanej daty
      mealTime: formattedTime, // Użyj sformatowanej godziny
      mealAdviceInfo: `Składniki: ${ingredients}` // Dodatkowe informacje
    };
  
    console.log('Zapisz posiłek: ', mealData);
  
    // Wywołanie serwisu do zapisywania posiłku
    this.limitsNutritionService.saveMeal(mealData).subscribe({
      next: (response) => {
        console.log('Posiłek zapisany pomyślnie:', response);
        this.isSaving = false; // Resetowanie isSaving po zakończeniu
        this.closeDialog(); // Zamknij okno po zapisaniu
      },
      error: (err) => {
        console.error('Błąd podczas zapisywania posiłku:', err);
        this.isSaving = false; // Resetowanie isSaving w przypadku błędu
      }
    });
  }
  
  private formatDate(date: string | Date): string {
    if (typeof date === 'string') {
      date = new Date(date); // Przekonwertuj string na Date, jeśli to konieczne
    }
  
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Miesiące są indeksowane od 0
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
  
    // Zwróć datę w formacie "YYYY-MM-DD HH:mm:ss"
    return `${year}-${month}-${day} ${hours}:${minutes}:00`;
  }
  

  
  
  toggleMealType(type: string): void {
    const index = this.selectedMealTypes.indexOf(type);
    if (index === -1) {
      this.selectedMealTypes.push(type); // Dodaj typ, jeśli nie jest wybrany
    } else {
      this.selectedMealTypes.splice(index, 1); // Usuń typ, jeśli jest już wybrany
    }
  }

   toggleAdvanced(): void {
    this.isAdvancedVisible = !this.isAdvancedVisible;
  }

  // Metoda do generowania porady o posiłku
// Metoda do generowania porady o posiłku
generateMealAdvice(): void {
  if (this.selectedProducts.length === 0) {
      this.mealAdvice = 'Nie wybrałeś jeszcze żadnych produktów. Dodaj produkty do posiłku!';
      return;
  }

  this.loading = true; 

  const mealAdvice: MealAdvice = {
      selectedProducts: this.selectedProducts,
      comment: `${this.additionalInfo} ${this.allowAdditionalProducts ? "Można dodać inne produkty." : "Nie można dodawać innych produktów."}`,
      healthy: this.isHealthy,
      mealTimes: this.selectedMealTime ? [this.selectedMealTime] : [],
      allowAdditionalProducts: this.allowAdditionalProducts,

      // Nowe opcjonalne pola
      calories: this.calories,
      minCarbs: this.minCarbs,
      maxCarbs: this.maxCarbs,
      minProtein: this.minProtein,
      maxProtein: this.maxProtein,
      minFat: this.minFat,
      maxFat: this.maxFat,
      mealTypes: this.selectedMealTypes
  };

  this.limitsNutritionService.sendMealAdvice(mealAdvice).subscribe(
      response => {
          this.mealAdvice = response.mealIdea;

          // Example of using regex to extract information if necessary
          this.extractMealInfo(this.mealAdvice);
          this.loading = false;
          this.hasGeneratedAdvice = true;
      },
      error => {
          this.mealAdvice = 'Wystąpił błąd podczas generowania porady. Spróbuj ponownie później.';
          this.loading = false;
      }
  );
}
private extractMealInfo(mealAdvice: string): string {
  const recipeRegex = /1# Nazwa: (.*?)\n2# Kalorie: (.*?)\n3# Składniki: (.*?)\n4# Przepis:\n([\s\S]*)/;
  const match = mealAdvice.match(recipeRegex);

  if (match) {
      const mealName = match[1].trim();
      const nutritionalInfo = match[2].trim();
      const ingredients = match[3].trim().split('\n').map(ing => ing.trim());
      const instructions = match[4].trim().split("\n").map(inst => inst.trim());

      // Tworzenie struktury formatowanej z wykorzystaniem stylów
      const formattedRecipe = `
### **Nazwa:**  
${mealName}

### **Kalorie i wartości odżywcze:**  
${nutritionalInfo}

### **Składniki:**  
${ingredients.map((ingredient, index) => `${index + 1}. ${ingredient}`).join("\n")}

### **Przygotowanie:**  
${instructions.map((instruction, index) => `${index + 1}. ${instruction}`).join("\n")}
`.trim();

      return formattedRecipe; // Zwrócenie sformatowanego przepisu
  } else {
      return "Nie można wydobyć przepisu z tekstu.";
  }
}


  // Metody do filtrowania produktów
  onSearchProducts(event: Event): void {
    const searchText = (event.target as HTMLInputElement).value;
    this.searchProductsSubject.next(searchText);
  }

  onSearchSelected(event: Event): void {
    const searchText = (event.target as HTMLInputElement).value;
    this.searchSelectedSubject.next(searchText);
  }

  filterProducts(searchText: string): void {
    if (searchText) {
      this.filteredProducts = this.products.filter(product => 
        product.title.toLowerCase().includes(searchText.toLowerCase())
      );
    } else {
      this.filteredProducts = this.products;
    }
  }

  filterSelectedProducts(searchText: string): void {
    if (searchText) {
      this.filteredSelectedProducts = this.selectedProducts.filter(product => 
        product.title.toLowerCase().includes(searchText.toLowerCase())
      );
    } else {
      this.filteredSelectedProducts = this.selectedProducts;
    }
  }

  addToSelected(product: Product): void {
    if (!this.selectedProducts.includes(product)) {
      this.selectedProducts.push(product);
      this.filteredSelectedProducts = this.selectedProducts; // Resetuj filtrowaną listę
    }
  }

  removeFromSelected(product: Product): void {
    this.selectedProducts = this.selectedProducts.filter(p => p !== product);
    this.filteredSelectedProducts = this.selectedProducts; // Resetuj filtrowaną listę
  }

  handleLogout() {
    this.authService.removeToken();
  }
}
