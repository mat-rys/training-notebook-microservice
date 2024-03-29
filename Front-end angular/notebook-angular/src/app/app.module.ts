import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

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
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}


