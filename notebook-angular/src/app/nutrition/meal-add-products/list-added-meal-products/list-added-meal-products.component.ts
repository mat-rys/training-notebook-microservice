import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Meals } from '../models/meals.model';
import { Product } from '../models/product.model';

@Component({
  selector: 'app-list-added-meal-products',
  templateUrl: './list-added-meal-products.component.html',
  styleUrls: ['./list-added-meal-products.component.css']
})
export class ListAddedMealProductsComponent {
  @Input() selectedProducts!: Product[];
  @Output() totalsUpdated = new EventEmitter<Meals>();
  @Output() addProduct = new EventEmitter<{product: Product, grams: number}>();
  @Output() removeProduct = new EventEmitter<Product>();

  totalCalories!: number;
  totalFat!: number;
  totalProtein!: number;
  totalCarbs!: number;

  ngOnChanges() {
    this.calculateSelectedProductsTotals();
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
    this.totalsUpdated.emit(updatedTotals);
  }

  addSelectedProductToMeal(product: Product) {
    const existingProduct = this.selectedProducts.find(p => p.title === product.title);
    
    if (existingProduct) {
      alert('Ten produkt został już dodany do listy.');
      return;
    }

    const gramsToAdd = prompt(`Enter grams for ${product.title}:`, '100');
    if (gramsToAdd !== null) {
      const grams = parseFloat(gramsToAdd);
      if (!isNaN(grams) && grams > 0) {
        this.addProduct.emit({product, grams});
      } else {
        alert('Wprowadź poprawną wartość dla gramów (liczbę większą od zera lub nie jako znak).');
      }
    }
  }

  removeAddedProductConfirmation(product: Product) {
    if (confirm('Czy na pewno chcesz usunąć z listy dodanych ten produkt?')) {
      this.removeProduct.emit(product);
    }
  }
}