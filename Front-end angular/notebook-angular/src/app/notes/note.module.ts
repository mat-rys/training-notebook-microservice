import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NoteComponent } from './notes-list/note.component';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common'; 
import { RouterModule, Routes } from '@angular/router';
import { FormatHourPipe } from '../custom-pipes/format-hour.pipe'; 
import { NoteAddComponent } from './note-add/note-add.component';
import { NavbarComponent } from './note-add/navbar/navbar.component';
import { HeroSectionComponent } from './note-add/hero-section/hero-section.component'; 


const routes: Routes = [
  { path: '', component: NoteComponent },
  { path: 'notes-add', component: NoteAddComponent }
];

@NgModule({
  declarations: [NoteComponent,NoteAddComponent,FormatHourPipe, NavbarComponent, HeroSectionComponent],
  imports: [  
    FormsModule,
    HttpClientModule,
    CommonModule,
    RouterModule.forChild(routes)
  ], 
  exports: [NoteComponent], 
})
export class NoteModule {}
