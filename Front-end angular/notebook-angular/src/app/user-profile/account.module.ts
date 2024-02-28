import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AccountComponent } from './account/account.component';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common'; 
import { RouterModule, Routes } from '@angular/router';
import { NavbarAccountComponent } from './account/navbar-account/navbar-account.component';
import { ProfilePhotoComponent } from './account/profile-photo/profile-photo.component';
import { ProfileBodyComponent } from './account/profile-body/profile-body.component';
import { ProfileUserComponent } from './account/profile-user/profile-user.component';



const routes: Routes = [
  { path: '', component: AccountComponent },
];

@NgModule({
  declarations: [AccountComponent,NavbarAccountComponent, ProfilePhotoComponent, ProfileBodyComponent, ProfileUserComponent],
  imports: [  
    FormsModule,
    HttpClientModule,
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [AccountComponent], 
})
export class AccountModule {}
