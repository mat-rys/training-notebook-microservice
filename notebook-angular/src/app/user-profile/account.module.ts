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
import { ProfileMeasurementsComponent } from './account/profile-measurements/profile-measurements.component';
import { AdminManagmentComponent } from './admin-managment/users-managments/admin-managment.component';
import { NavbarAdminComponent } from './admin-managment/navbar-account/navbar-account.component';
import { SessionManagmentsComponent } from './admin-managment/session-managments/session-managments.component';
const routes: Routes = [
  { path: '', component: AccountComponent },
  { path: 'body-measurement', component: ProfileMeasurementsComponent },
  { path: 'admin-managment', component: AdminManagmentComponent},
  { path: 'session-managment', component: SessionManagmentsComponent}
];

@NgModule({
  declarations: [AccountComponent,NavbarAccountComponent, ProfilePhotoComponent, 
    ProfileBodyComponent, ProfileUserComponent,ProfileMeasurementsComponent, AdminManagmentComponent, NavbarAdminComponent, SessionManagmentsComponent],
  imports: [  
    FormsModule,
    HttpClientModule,
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [AccountComponent], 
})
export class AccountModule {}
