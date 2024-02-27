import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../../security-config/auth.service';
import { AccountService } from '../account/services/account-data.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css'],
  providers: [AuthService]
})
export class AccountComponent implements OnInit {
  user: any = {}; 
  body: any = {};
  photo: any = {};

  currentSlideIndex = 0;

  newWeight: number = 0; 
  newImageUrl = ''; 
  newHeight: number = 0;
  newGender= '';
  newAge: number = 0;
  newGoals='';
  newEmail= '';
  newFirstName = '';
  newLastName = '';
  newUsername = '';
  
  showImageInput = false; 
  showWeightInput = false;
  showHeightInput = false;
  showGenderInput = false;
  showAgeInput = false;
  showGoalsInput = false;
  showEmailInput = false;
  showFirstNameInput = false;
  showLastNameInput = false;
  showUsernameInput = false;
  showPhotoInput = false; 

  token = this.authService.getToken();

  constructor(private authService: AuthService,
     private http: HttpClient,
     private accountService: AccountService) { 
     }

   ngOnInit(): void {
    this.loadUser();
    this.loadBodyProfil();
    this.loadPhoto(); 
  }

  loadPhoto() {
    this.accountService.loadPhoto().subscribe(data => {
      this.photo = data;
    });
  }

  loadUser() {
    this.accountService.loadUser().subscribe(data => {
      this.user = data;
    });
  }

  loadBodyProfil() {
    this.accountService.loadBodyProfil().subscribe(data => {
      this.body = data;
    });
  }

  updateImage() {
    const updatedImageUrl = this.newImageUrl; 
    this.showImageInput = false; 

    this.accountService.updateImage(updatedImageUrl).subscribe(() => {
      this.loadPhoto();
    });
    this.toggleInput('photo');
  }

  updateBodyProfile(fieldName: string, updatedValue: any) {
    this.accountService.updateBodyProfile(fieldName, updatedValue).subscribe(() => {
      this.loadBodyProfil();
    });
    this.toggleInput(fieldName);
  }

  updateField(fieldName: string, updatedValue: any) {
    this.accountService.updateField(fieldName, updatedValue).subscribe(() => {
      this.loadUser();
    });
    this.toggleInput(fieldName);
  }
  
  toggleInput(fieldName: string) {
    switch(fieldName) {
      case 'email':
        this.showEmailInput = !this.showEmailInput;
        break;
      case 'firstName':
        this.showFirstNameInput = !this.showFirstNameInput;
        break;
      case 'lastName':
        this.showLastNameInput = !this.showLastNameInput;
        break;
      case 'username':
        this.showUsernameInput = !this.showUsernameInput;
        break;
      case 'weight':
        this.showWeightInput = !this.showWeightInput;
        break;
      case 'height':
        this.showHeightInput = !this.showHeightInput;
        break;
      case 'gender':
        this.showGenderInput = !this.showGenderInput;
        break;
      case 'age':
        this.showAgeInput = !this.showAgeInput;
        break;
      case 'goals':
        this.showGoalsInput = !this.showGoalsInput;
        break;  
      case 'photo':
        this.showPhotoInput = !this.showPhotoInput;
        break;  
      default:
        break;
    }
  }

}
