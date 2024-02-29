import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Product } from './models/product.model';
import { ProductsService } from '../services/products.service';
import { AuthService } from '../../security-config/auth.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  logoPath = 'assets\\Training Notebook-logos.png';
  ramenPhoto = 'assets\\ramen.jpg';
  searchQuery: string = ''; 
  products: Product[] = [];
  filteredProducts: Product[] = []; 
  editingProduct: Product | null = null; 
  token = this.authService.getToken();
  searchTimeout: any;
  successMessage: string = '';
  isEditing: boolean = false;

  constructor(private authService: AuthService, private productsService: ProductsService) {}

  ngOnInit(): void {
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
    this.productsService.loadProducts().subscribe((data) => {
      this.products = data;
    });
  }

  deleteProduct(product: Product) {
    this.productsService.deleteProduct(product.id).subscribe(() => {
      this.loadProducts();
      this.successMessage = 'Product successfully deleted!'; 
      setTimeout(() => {
        this.successMessage = ''; 
      }, 800);
    }, error => {
      console.error('Error deleting product:', error);
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
    this.editingProduct = null;
  }
  
  updateProduct() {
    if (this.editingProduct) {
      this.productsService.updateProduct(this.editingProduct.id, this.editingProduct).subscribe(() => {
        this.loadProducts();
        this.editingProduct = null;
        this.successMessage = 'Product successfully updated!'; 
        setTimeout(() => {
          this.successMessage = ''; 
        }, 800);
      }, error => {
        console.error('Error updating product:', error);
      });
    }
  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  onKeyUp() {
    clearTimeout(this.searchTimeout);
    this.searchTimeout = setTimeout(() => {
      this.searchProducts();
    }, 300); 
  }
}






