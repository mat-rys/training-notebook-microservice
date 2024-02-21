import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { StartPageComponent } from './start-page/start-page.component';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common'; // Dodaj CommonModule
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', component: StartPageComponent },
  { path: 'login', component: LoginComponent },
  { path: 'registration', component: RegistrationComponent }
];

@NgModule({
  declarations: [
    StartPageComponent,
    LoginComponent,
    RegistrationComponent
  ],
  imports: [  
    HttpClientModule,
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes)
  ],
  exports: [ 
    StartPageComponent,
    LoginComponent,
    RegistrationComponent
  ], 
})
export class BeforeAuthModule {}
