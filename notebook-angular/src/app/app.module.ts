import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthInterceptor } from './security-config/auth.interceptor';
import { ActivityMonitorService } from './security-config/activity-monitor.service';
import { AuthService } from './security-config/auth.service';

@NgModule({
  declarations: [
    AppComponent
    ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule, 
    FormsModule, 
    HttpClientModule, 
    AppRoutingModule,
  ], 
  providers: [
    {
      
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    ActivityMonitorService,
    AuthService
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}


