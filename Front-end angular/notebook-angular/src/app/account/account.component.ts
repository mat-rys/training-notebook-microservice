import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../security-config/auth.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
  logoPath = "assets\\Training Notebook-logos.png";
  womenRegistration = "assets\\hiking-female-boots.jpg";
  user: any = {}; // Tutaj przechowujesz dane użytkownika
  body: any = {};
  photo: any = {};

  showWeightInput = false; // Add this line to declare the property

  newWeight: number = 0; // Initialize with a default value
  currentSlideIndex = 0;

  showImageInput = false; // Flaga do wyświetlania inputu do zmiany obrazka
  newImageUrl = ''; // Nowy URL obraz

  newHeight: number = 0;
  newGender= '';
  newAge: number = 0;
  newGoals='';

  showHeightInput = false;
  showGenderInput = false;
  showAgeInput = false;
  showGoalsInput = false;

  newEmail= '';
  newFirstName = '';
  newLastName = '';
  newUsername = '';

  showEmailInput = false;
  showFirstNameInput = false;
  showLastNameInput = false;
  showUsernameInput = false;
  token = this.authService.getToken();

  constructor(private authService: AuthService, private http: HttpClient) { }

  ngOnInit(): void {
    console.log(this.token);
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });

    this.loadUser(headers);
    this.loadBodyProfil(headers);
    this.loadPhoto(headers); 
  }

  logout() {
    this.authService.removeToken();
  }

  //LOAD
  loadPhoto(headers: HttpHeaders) {
    // Wykonaj zapytanie HTTP z nagłówkiem zawierającym token Bearer
    this.http.get<any[]>('http://localhost:8222/body/photo', { headers })
    .subscribe(data => {
      this.photo = data;
    });
    
  }

  loadUser(headers: HttpHeaders) {
    // Wykonaj zapytanie HTTP z nagłówkiem zawierającym token Bearer
    this.http.get<any[]>('http://localhost:8222/account/user', { headers })
      .subscribe(data => {
        this.user = data;
      });
  }

  loadBodyProfil(headers: HttpHeaders) {
    // Wykonaj zapytanie HTTP z nagłówkiem zawierającym token Bearer
    this.http.get<any[]>('http://localhost:8222/body/get', { headers })
      .subscribe(data => {
        this.body = data;
      });
  }


  //EDITING CHANGE
  toggleImageInput() {
    this.showImageInput = !this.showImageInput;
  }

  updateImage() {
    const updatedImageUrl = this.newImageUrl; // Przyjmij nowy URL obrazka
    this.showImageInput = false; // Schowaj input po zaktualizowaniu

     const headers = new HttpHeaders({
       'Authorization': `Bearer ${this.token}`
     });
    // Wyślij nowy URL obrazka na serwer za pomocą metody POST
    this.http.post('http://localhost:8222/body/photo', { photoUrl: updatedImageUrl }, { headers })
      .subscribe(() => {
        this.loadPhoto(headers); 
        // Po udanej aktualizacji, ponownie pobierz obrazek profilowy
        this.loadPhoto(new HttpHeaders({ 'Authorization': `Bearer ${this.token}` }));
      });
  }

  updateWeight() {
    // Send the new weight to the server
    const updatedWeight = this.newWeight;
    this.showImageInput = false; // Schowaj input po zaktualizowaniu
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
    const apiEndpoint = 'http://localhost:8222/body/weight';
    this.http.put(apiEndpoint, updatedWeight, { headers })
      .subscribe(response => {
        this.loadBodyProfil(headers);
      });
  
    this.showWeightInput = false;
  }

  updateHeight() {
    // Wysyłanie nowej wartości "Height" na serwer
    const updatedHeight = this.newHeight;

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });

    const apiEndpoint = 'http://localhost:8222/body/height';

    this.http.put(apiEndpoint, updatedHeight, { headers })
      .subscribe(response => {
        this.loadBodyProfil(headers);
      });

    this.showHeightInput = false;
  }

  updateGender() {
    // Wysyłanie nowej wartości "Gender" na serwer
    const updatedGender = this.newGender;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });

    const apiEndpoint = 'http://localhost:8222/body/gender';
    this.http.put(apiEndpoint, updatedGender , { headers })
      .subscribe(response => {
        this.loadBodyProfil(headers);
      });

    this.showGenderInput = false;
  }

 

  updateAge() {
    // Wysyłanie nowej wartości "Age" na serwer
    const updatedAge = this.newAge;

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });

    const apiEndpoint = 'http://localhost:8222/body/age';

    this.http.put(apiEndpoint, updatedAge, { headers })
      .subscribe(response => {
        this.loadBodyProfil(headers);
      });

    this.showAgeInput = false;
  }

  updateGoals() {
    // Wysyłanie nowej wartości "Goals" na serwer
    const updatedGoals = this.newGoals;

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });

    const apiEndpoint = 'http://localhost:8222/body/goals';

    this.http.put(apiEndpoint, updatedGoals , { headers })
      .subscribe(response => {
        this.loadBodyProfil(headers);
      });

    this.showGoalsInput = false;
  }
  
  updateEmail() {
         // Wysyłanie nowej wartości "Goals" na serwer
    const updatedEmail = this.newEmail;

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });

    const apiEndpoint = 'http://localhost:8222/account/user/email';

    this.http.put(apiEndpoint,  updatedEmail , { headers })
      .subscribe(response => {
        this.loadUser(headers);
      });

    this.showEmailInput = false;
  }

  updateFirstName() {
          // Wysyłanie nowej wartości "Goals" na serwer
          const updatedFirstName = this.newFirstName;
      
          const headers = new HttpHeaders({
            'Authorization': `Bearer ${this.token}`
          });
      
          const apiEndpoint = 'http://localhost:8222/account/user/firstname';
      
          this.http.put(apiEndpoint, updatedFirstName, { headers })
            .subscribe(response => {
              this.loadUser(headers);
            });
      
          this.showEmailInput = false;
  }

  updateLastName() {
       // Wysyłanie nowej wartości "Goals" na serwer
       const updatedLastName = this.newLastName;
   
       const headers = new HttpHeaders({
         'Authorization': `Bearer ${this.token}`
       });
   
       const apiEndpoint = 'http://localhost:8222/account/user/lastname';
   
       this.http.put(apiEndpoint,  updatedLastName, { headers })
         .subscribe(response => {
          this.loadUser(headers);
         });
   
       this.showEmailInput = false;
  }

  updateUsername() {
    // Wysyłanie nowej wartości "Goals" na serwer
    const updatedUsername = this.newUsername;

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });

    const apiEndpoint = 'http://localhost:8222/account/user/username';

    this.http.put(apiEndpoint,  updatedUsername, { headers })
      .subscribe(response => {
        this.loadUser(headers);
      });

    this.showEmailInput = false;
  }

  toggleWeightInput() {
    this.showWeightInput = !this.showWeightInput;
  }
  
  toggleHeightInput() {
    this.showHeightInput = !this.showHeightInput;
  }
  
  toggleGenderInput() {
    this.showGenderInput = !this.showGenderInput;
  }
  
  toggleAgeInput() {
    this.showAgeInput = !this.showAgeInput;
  }
  
  toggleGoalsInput() {
    this.showGoalsInput = !this.showGoalsInput;
  }
  
  toggleEmailInput() {
    this.showEmailInput = !this.showEmailInput;
  }
  
  toggleFirstNameInput() {
    this.showFirstNameInput = !this.showFirstNameInput;
  }
  
  toggleLastNameInput() {
    this.showLastNameInput = !this.showLastNameInput;
  }
  
  toggleUsernameInput() {
    this.showUsernameInput = !this.showUsernameInput;
  }

}
