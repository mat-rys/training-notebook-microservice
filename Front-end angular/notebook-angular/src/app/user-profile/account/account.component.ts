import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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



  token = this.authService.getToken();

  constructor(private authService: AuthService,private accountService: AccountService) { }

   ngOnInit(): void {
    this.loadUserProfile();
    this.loadBodyProfil();
    this.loadPhoto(); 
  }

  loadPhoto() {
    this.accountService.loadPhoto().subscribe(data => {
      this.photo = data;
      console.log(this.photo)
    });
  }

  loadUserProfile() {
    this.accountService.loadUser().subscribe(data => {
      console.log(data)
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
