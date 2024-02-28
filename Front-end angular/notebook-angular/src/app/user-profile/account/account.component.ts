import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../../security-config/auth.service';
import { AccountService } from '../account/services/account-data.service';
import { Photo } from './models/photo.model';
import { Body } from './models/body-profil.model';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css'],
  providers: [AuthService]
})
export class AccountComponent implements OnInit {
  user: any = {}; 
  body!: Body;
  photo!: Photo;

  newEmail= '';
  newFirstName = '';
  newLastName = '';
  newUsername = '';
  
  showEmailInput = false;
  showFirstNameInput = false;
  showLastNameInput = false;
  showUsernameInput = false;

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
      console.log(this.photo)
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

  updateImage(updatedImageUrl: string) {
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
      default:
        break;
    }
  }

}
