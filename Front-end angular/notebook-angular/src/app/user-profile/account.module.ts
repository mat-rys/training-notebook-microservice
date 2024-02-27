import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AccountComponent } from './account/account.component';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common'; 
import { RouterModule, Routes } from '@angular/router';
import { NavbarAccountComponent } from './account/navbar-account/navbar-account.component';


const routes: Routes = [
  { path: '', component: AccountComponent },
];

@NgModule({
  declarations: [AccountComponent,NavbarAccountComponent],
  imports: [  
    FormsModule,
    HttpClientModule,
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [AccountComponent], 
})
export class AccountModule {}
