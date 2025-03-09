import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { AuthService } from '../../security-config/auth.service';
import { ProductsService } from '../services/products.service';


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  logoPath = 'assets\\Training Notebook-logos.png';
  ramenPhoto = 'assets\\ramen.jpg';

  calories: number = 0; 
  title: string = ''; 
  grams: number = 0; 
  carbs: number = 0; 
  protein: number = 0; 
  fat: number = 0; 
  productCreated: boolean = false;
  productError: boolean = false; 
  token = this.authService.getToken();

  constructor(private authService: AuthService, private productsService: ProductsService) {}
  ngOnInit(): void {}

  handleLogout() {
    this.authService.removeToken();
  }
  
  createProduct() {
    if (!this.title.trim() || this.calories < 0 || this.grams < 0 || this.carbs < 0 || this.protein < 0 || this.fat < 0) {
      this.productError = true; 
      setTimeout(() => {
        this.productError = false; 
      }, 1500);
      return;
    }

    const newProduct = {
      title: this.title,
      calories: this.calories,
      grams: this.grams,
      carbs: this.carbs,
      protein: this.protein,
      fat: this.fat
    };

    this.productsService.createProduct(newProduct).subscribe(
      (response) => {
        this.productCreated = true;
        setTimeout(() => {
          this.productCreated = false; 
        }, 1500);
        setTimeout(() => {
          this.title = '';
          this.calories = 0;
          this.grams = 0;
          this.carbs = 0;
          this.protein = 0;
          this.fat = 0;
        }, 1500);
      },
      (error) => {
        console.error('An error occurred while creating the product.', error);
        this.productError = true; 
        setTimeout(() => {
          this.productError = false; 
        }, 1500);
      }
    );
  }
}
