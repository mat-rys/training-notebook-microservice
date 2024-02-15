import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Product } from './product.model';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { ProductMeal } from './product-meal.model';
import { Meals } from './meals.model';
import { AuthService } from '../../security-config/auth.service';
import { debounceTime } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-meal-add-products',
  templateUrl: './meal-add-products.component.html',
  styleUrls: ['./meal-add-products.component.css']
})
export class MealAddProductsComponent implements OnInit {
  logoPath = 'assets\\Training Notebook-logos.png';
  ramenPhoto = 'assets\\ramen.jpg';
  

  searchQuery: string = ''; 
  products: Product[] = [];
  filteredProducts: Product[] = []; 
  editingProduct: Product | null = null; 
  
  addedProducts: Product[] = []; 
  totalCalories: number = 0;
  totalFat: number = 0;
  totalProtein: number = 0;
  totalCarbs: number = 0;

  idMeal!: number;

  selectedProducts: Product[] = []; 
  isEditingGrams: boolean = false;
  selectedProduct: Product | null = null;
  selectedProductGrams: number = 100; 
  private searchTerms = new Subject<string>();

  token = this.authService.getToken();

  constructor(private authService: AuthService, private http: HttpClient, private route: ActivatedRoute,  private router: Router) {}

  ngOnInit(): void {
    this.searchTerms.pipe(debounceTime(600)).subscribe(() => {
      this.searchProducts();
    });
    this.route.queryParams.subscribe(params => {
      this.idMeal = params['mealId'];
      console.log(this.idMeal);
      this.loadProductsForMeal(this.idMeal); 
    });
    this.loadProducts();
  }
  logout() {
    this.authService.removeToken();
  }

  searchProducts() {
    this.filteredProducts = this.products.filter(product =>
      product.title.toLowerCase().startsWith(this.searchQuery.toLowerCase())
    );
  }

  loadProducts() {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
    });

    const url = 'http://localhost:8222/nutrition/products';

    this.http.get<Product[]>(url, { headers }).subscribe((data) => {
      this.products = data;
    });
  }

  
  deleteProduct(product: Product) {
    const deleteHeaders = new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
    });

    this.http.delete(`http://localhost:8222/nutrition/products/${product.id}`, { headers: deleteHeaders })
      .subscribe(() => {
        this.loadProducts();
      }, error => {
        console.error('Błąd podczas usuwania notatki:', error);
      });
  }

  deleteProductConfirmation(product: Product) {
    if (confirm('Czy na pewno chcesz usunąć ten produkt?')) {
      this.deleteProduct(product);
    }
  }

  editProduct(product: Product) {
    this.editingProduct = { ...product };
  }

  cancelEdit() {
    this.editingProduct = null; // Ukryj formularz edycji
  }

  updateProduct() {
    if (this.editingProduct) {
      const headers = new HttpHeaders({
        Authorization: `Bearer ${this.token}`,
      });

      this.http.put(`http://localhost:8222/nutrition/products/${this.editingProduct.id}`, this.editingProduct, { headers })
        .subscribe(response => {
          this.loadProducts();
          this.editingProduct = null;
        }, error => {
          console.error('Error updating product:', error);
        });
    }
  }
  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }


   loadProductsForMeal(mealId: number) {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
    });

    const url = `http://localhost:8222/nutrition/products-meals/get-for-meal/${mealId}`;
    this.http.get<Product[]>(url, { headers }).subscribe((data) => {
      this.selectedProducts = data;
      this.calculateSelectedProductsTotals();
    });
  }

  calculateSelectedProductsTotals() {
    this.totalCalories = this.selectedProducts.reduce((sum, product) => sum + product.calories, 0);
    this.totalFat = this.selectedProducts.reduce((sum, product) => sum + product.fat, 0);
    this.totalProtein = this.selectedProducts.reduce((sum, product) => sum + product.protein, 0);
    this.totalCarbs = this.selectedProducts.reduce((sum, product) => sum + product.carbs, 0);
    

  const updatedTotals: Meals = {
    calories: this.totalCalories,
    carbs: this.totalCarbs,
    protein: this.totalProtein,
    fat: this.totalFat,
  };
  this.updateMealTotals(updatedTotals);
}
  
  updateMealTotals(updatedTotals: Meals) {  
    this.route.queryParams.subscribe(params => {
      this.idMeal = params['mealId'];
    });

    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
    });
  
    const url = `http://localhost:8222/nutrition/meals/${this.idMeal}`;
  
    this.http.put<Meals>(url, updatedTotals, { headers }).subscribe(
      (response) => {
        console.log('Meal totals updated:', response);
      },
      (error) => {
        console.error('Error updating meal totals:', error);
     }
    ); 
  }

  addSelectedProductToMeal(product: Product) {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
    });
  
    this.route.queryParams.subscribe(params => {
      this.idMeal = params['mealId'];
    });
  
    const existingProduct = this.selectedProducts.find(p => p.title === product.title);
  
    if (existingProduct) {
      alert('Ten produkt został już dodany do listy.');
    } else {
      const gramsToAdd = prompt(`Enter grams for ${product.title}:`, '100');
      if (gramsToAdd !== null) {
        const grams = parseFloat(gramsToAdd);
        if (!isNaN(grams) && grams > 0) {
          const calories = (grams / 100) * product.calories;
          const fat = (grams / 100) * product.fat;
          const protein = (grams / 100) * product.protein;
          const carbs = (grams / 100) * product.carbs;
  
          const productToAdd: ProductMeal = {
            title: product.title,
            calories: calories,
            grams: grams,
            carbs: carbs,
            protein: protein,
            fat: fat,
            mealId: this.idMeal,
          };
  
          this.http.post('http://localhost:8222/nutrition/products-meals', productToAdd, { headers }).subscribe(
            (response) => {
              console.log('Product added to meal:', response);
              this.calculateSelectedProductsTotals(); // Zaktualizuj sumy wybranych produktów
              this.ngOnInit();
            },
            (error) => {
              console.error('Error adding product to meal:', error);
            }
          );
        } else {
          alert('Wprowadź poprawną wartość dla gramów (liczbę większą od zera lub nie jako znak).');
        }
      }
    }
  }
  

  removeProduct(product: Product) {  
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
    });
    this.http.delete(`http://localhost:8222/nutrition/products-meals/${product.id}`, { headers })
      .subscribe(
        () => {
          this.selectedProducts = this.selectedProducts.filter(p => p.id !== product.id);
          this.calculateSelectedProductsTotals();
        },
        (error) => {
          console.error('Error removing product from meal:', error);
        }
      );
  }

  removeAddedProductConfirmation(product: Product) {
    if (confirm('Czy na pewno chcesz usunąć z listy dodanych ten produkt?')) {
      this.removeProduct(product);
    }
  }
  
}
  











