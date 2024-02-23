import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AccountComponent } from './account/account.component';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common'; // Dodaj CommonModule
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  { path: '', component: AccountComponent },
];

@NgModule({
  declarations: [AccountComponent],
  imports: [  
    FormsModule,
    HttpClientModule,
    CommonModule,
    RouterModule.forChild(routes)
  ], // Dodaj CommonModule],
  exports: [AccountComponent], // Opcjonalnie eksportuj komponent, jeśli będzie używany poza tym modulem
})
export class AccountModule {}
