  import { NgModule } from '@angular/core';
  import { RouterModule, Routes } from '@angular/router';
  
  import { AuthGuard } from './security-config/auth.guar';

  const routes: Routes = [
    { path: '', loadChildren: () => import('./auth/before-auth.module').then(m => m.BeforeAuthModule)},
    
    { path: 'start-page', loadChildren: () => import('./auth/before-auth.module').then(m => m.BeforeAuthModule)},
    
    { path: 'account', loadChildren: () => import('./user-profile/account.module').then(m => m.AccountModule), canActivate: [AuthGuard] },

    { path: 'bmi-chart', loadChildren: () => import('./bmi-chart/bmi-chart.module').then(m => m.BmiChartModule), canActivate: [AuthGuard] },

    { path: 'notes', loadChildren: () => import('./notes/note.module').then(m => m.NoteModule), canActivate: [AuthGuard] },
    
    { path: 'nutrition', loadChildren: () => import('./nutrition/nutrition.module').then(m => m.NutritionModule), canActivate: [AuthGuard]} ,

    { path: 'cooking', loadChildren: () => import('./cooking/cooking.module').then(m => m.CookingModule), canActivate: [AuthGuard]} ,
  ];
  

  @NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }
