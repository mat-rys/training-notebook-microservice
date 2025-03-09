import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../security-config/auth.service';
import { AccountService } from '../account/services/account-data.service';
import { Photo } from './models/photo.model';
import { Body } from './models/body-profil.model';
import { User } from './models/user.model';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css'],
  providers: [AuthService]
})
export class AccountComponent implements OnInit {
  user!: User; 
  body!: Body;
  photo!: Photo;

  imageUrl: string | null = null;
  aiOpinionLoading: boolean = false;
  aiOpinion: string = '';
  datesOfMealsForAi!: string;
  datesWithNotes: string[] = [];

  constructor(private accountService: AccountService) { }

   ngOnInit(): void {
    this.loadUserProfile();
    this.loadBodyProfil();
    this.loadPhoto(); 
    this.imageUrl = this.getRandomImage();
  }

  loadPhoto() {
    this.accountService.loadPhoto().subscribe(
      data => {this.photo = data;},
      error => {if (error.status === 404) {this.createImage('');}}
    );
  }

  loadUserProfile() {
    this.accountService.loadUser().subscribe(data => {
      this.user = data;
    });
  }

  loadBodyProfil() {
    this.accountService.loadBodyProfil().subscribe(
      data => {this.body = data;},
      error => {
        if (error.status === 404) {
          const emptyBodyProfile: Body = {
            weight: 0,
            height: 0,
            gender: '',
            age: 0,
            goals: ''
          };
          this.createBodyProfile(emptyBodyProfile);
        }
      }
    );
  }
  
createBodyProfile(bodyProfile: Body) {
  this.accountService.createBodyProfile(bodyProfile).subscribe(() => {
    this.loadBodyProfil();
  });
}

updateImage(updatedImageUrl: string) {
  this.accountService.updateImage(updatedImageUrl).subscribe(() => {
    this.loadPhoto();
  });
  }

  createImage(updatedImageUrl: string) {
    this.accountService.createImage(updatedImageUrl).subscribe(() => {
      this.loadPhoto();
    });
    }

  updateBodyProfile(fieldName: string, updatedValue: any) {
    this.accountService.updateBodyProfile(fieldName, updatedValue).subscribe(() => {
      this.loadBodyProfil();
    });
  }

  updateUserProfile(fieldName: string, updatedValue: any) {
    this.accountService.updateField(fieldName, updatedValue).subscribe(() => {
      this.loadUserProfile();
    });
  }

  loadAiOpinion(): void {
    this.aiOpinionLoading = true;
    this.accountService.generateAiBodyInformationOpinion().subscribe(
      (response) => {
        // Konwersja odpowiedzi AI na listę punktów
        const formattedResponse = response.generation
          .replace(/(?<!^)(\d+\.)/g, '<br><strong>$1</strong>')  // Dodaje <br> i pogrubia każdą liczbę z wyjątkiem 1.
          .replace(/^(1\.)/, '<strong>1.</strong>')      // Pogrubia 1. i dodaje tekst "Balance: "
          .replace(/^(2\.)/, '<strong>2.</strong>')      // Pogrubia 2. i dodaje tekst "Pluses: "
          .replace(/^(3\.)/, '<strong>3.</strong>')     // Pogrubia 3. i dodaje tekst "Minuses: "
          .replace(/^(4\.)/, '<strong>4.</strong>') // Pogrubia 4. i dodaje tekst "Additional: "
          .replace(/(\d+\.)/g, '<br><strong>$1</strong>'); // Pogrubienie wszystkich numerów z kropką i dodanie <br>
    
        console.log(formattedResponse)
        this.aiOpinion = formattedResponse;
        this.aiOpinionLoading = false;
      },
      (error) => {
        console.error(error);
        this.aiOpinionLoading = false;
      }
    );
  }
  
  

  getRandomImage(): string {
    const images = ['assets/icons8-hockey-100.png', 'assets/icons8-dumbbell-100.png', 'assets/icons8-darts-100.png',
     'assets/icons8-surf-100.png', 'assets/icons8-wingsuite-100.png', 'assets/icons8-medal-first-place-100.png'];
    const randomIndex = Math.floor(Math.random() * images.length);
    return images[randomIndex];
  }
  
}
