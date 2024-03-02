import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Product } from '../models/product.model';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent {
  
  @Input() loadedProducts!: Product[];
  @Output() deleteProduct = new EventEmitter<Product>();
  @Output() updateProduct = new EventEmitter<Product>();

  searchTimeout: any;
  searchQuery: string = ''; 
  filteredProducts: Product[] = []; 
  editingProduct: Product | undefined;

  onDeleteProduct(product: Product) {
    confirm('Czy na pewno chcesz usunąć ten produkt?') ? this.deleteProduct.emit(product) : null;
  }

  onUpdateNote() {
    if (this.editingProduct !== undefined) {
      console.log(this.editingProduct);
      this.updateProduct.emit(this.editingProduct);
    }
  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }   

  onKeyUp() {
    clearTimeout(this.searchTimeout);
    this.searchTimeout = setTimeout(() => {this.searchProducts();}, 300); 
  }

  searchProducts() {
    this.filteredProducts = this.loadedProducts.filter(product =>
      product.title.toLowerCase().startsWith(this.searchQuery.toLowerCase())
    );
  }

  editProduct(product: Product) {
    this.editingProduct = { ...product };
  }

  cancelEdit() {
    this.editingProduct = undefined;
  }
}
