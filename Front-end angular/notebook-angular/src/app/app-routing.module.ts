import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component'; 
import { RegistrationComponent } from './registration/registration.component'; 
import { AccountComponent } from './account/account.component';
import { StartPageComponent } from './start-page/start-page.component'; 

const routes: Routes = [
  { path: 'login', component: LoginComponent }, 
  { path: 'registration', component: RegistrationComponent }, 
  { path: 'start-page', component: StartPageComponent }, 
  { path: 'account', component: AccountComponent }, 
  { path: '', redirectTo: 'start-page', pathMatch: 'full' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
