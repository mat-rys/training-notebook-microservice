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

  constructor(private accountService: AccountService) { }

   ngOnInit(): void {
    this.loadUserProfile();
    this.loadBodyProfil();
    this.loadPhoto(); 
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
}
