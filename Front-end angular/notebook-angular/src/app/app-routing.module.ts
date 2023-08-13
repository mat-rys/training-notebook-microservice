import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component'; // Import komponentu logowania
import { StartPageComponent } from './start-page/start-page.component'; // Import komponentu strony startowej

const routes: Routes = [
  { path: 'login', component: LoginComponent }, // Dla ścieżki /login użyj LoginComponent
  { path: 'start-page', component: StartPageComponent }, // Dla ścieżki /start-page użyj StartPageComponent
  { path: '', redirectTo: 'start-page', pathMatch: 'full' },
  { path: '**', redirectTo: 'start-page' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
