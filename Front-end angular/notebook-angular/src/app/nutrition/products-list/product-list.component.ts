import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Product } from './models/product.model';
import { FormsModule } from '@angular/forms';
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

  constructor(private authService: AuthService,private http: HttpClient) {}

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
      this.successMessage = 'Product successfully deleted!'; // Ustaw komunikat o sukcesie
      setTimeout(() => {
        this.successMessage = ''; // Schowaj komunikat po 0.1 sekundy
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
      const headers = new HttpHeaders({
        Authorization: `Bearer ${this.token}`,
      });
  
      this.http.put(`http://localhost:8222/nutrition/products/${this.editingProduct.id}`, this.editingProduct, { headers })
        .subscribe(() => {
          this.loadProducts();
          this.editingProduct = null;
          this.successMessage = 'Product successfully updated!'; // Ustaw komunikat o sukcesie
          setTimeout(() => {
            this.successMessage = ''; // Schowaj komunikat po 0.1 sekundy
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






