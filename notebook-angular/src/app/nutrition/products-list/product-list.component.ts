import { Component, OnInit } from '@angular/core';
import { Product } from './models/product.model';
import { ProductsService } from '../services/products.service';
import { AuthService } from '../../security-config/auth.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  token = this.authService.getToken();
  successMessage: string = '';
  isEditing: boolean = false;

  constructor(private authService: AuthService, private productsService: ProductsService) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  handleLogout() {
    this.authService.removeToken();
  }

  loadProducts() {
    this.productsService.loadProducts().subscribe((data) => {
      this.products = data;
    });
  }

  deleteProduct(product: Product) {
    this.productsService.deleteProduct(product.id).subscribe(() => {
      this.loadProducts();
      this.successMessage = 'Produkt usunięty!'; 
      setTimeout(() => {this.successMessage = ''; }, 800);
    }, error => {console.error('Błą usunięcia produktu:', error);
    });
  }
  
  updateProduct(editingProduct: Product) {
    if (editingProduct) {
      this.productsService.updateProduct(editingProduct.id, editingProduct).subscribe(() => {
        this.loadProducts();
        this.successMessage = 'Produkt zmieniony!'; 
        setTimeout(() => {this.successMessage = ''; }, 800);
      }, error => {console.error('Błąd zmiany produktu:', error);});
    }
  }

}






