import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NoteComponent } from './notes-list/note.component';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common'; 
import { RouterModule, Routes } from '@angular/router';
import { FormatHourPipe } from '../custom-pipes/format-hour.pipe'; 
import { NoteAddComponent } from './note-add/note-add.component';
import { NavbarComponent } from './shared-child-component/navbar/navbar.component';
import { HeroSectionComponent } from './note-add/hero-section/hero-section.component';
import { DateSelectorComponent } from './notes-list/date-selector/date-selector.component';
import { ContentComponent } from './notes-list/content/content.component'; 
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { DateAdapter, MatNativeDateModule, MAT_DATE_FORMATS } from '@angular/material/core';


const routes: Routes = [
  { path: '', component: NoteComponent },
  { path: 'notes-add', component: NoteAddComponent }
];

@NgModule({
  declarations: [NoteComponent,NoteAddComponent,FormatHourPipe, NavbarComponent, HeroSectionComponent, DateSelectorComponent, ContentComponent],
  imports: [  
    FormsModule,
    HttpClientModule,
    CommonModule,
    RouterModule.forChild(routes),
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule
  ], 
  exports: [NoteComponent], 
})
export class NoteModule {}
