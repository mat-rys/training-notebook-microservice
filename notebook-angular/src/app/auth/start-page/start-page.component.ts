import { Component, OnInit, ElementRef } from '@angular/core';

@Component({
  selector: 'app-start-page',
  templateUrl: './start-page.component.html',
  styleUrls: ['./start-page.component.css']
})
export class StartPageComponent implements OnInit {
  logoPath = "assets\\Training Notebook-logos_transparent.png";
  registerPagePhotoPath= "assets\\register_page_for_startpage.png";

  content: any[] = [
    {
      image: "assets/profile.png",
      title: "Konta osobiste",
      description: "Utwórz swoje konto, aby łatwo uzyskać dostęp do Training Notebook. Przejmij kontrolę nad swoją podróżą fitness z personalizowanymi narzędziami i funkcjami."
    },
    {
      image: "assets/notes.png",
      title: "Tworzenie notatek",
      description: "Zapisuj notatki dotyczące treningów, celów i osiągnięć. Pozostań zorganizowany i zmotywowany dzięki łatwemu notowaniu."
    },
    {
      image: "assets/bmi.png",
      title: "Kalkulator BMI i BMR",
      description: "Określ swój wskaźnik masy ciała (BMI) i podstawową przemianę materii (BMR), aby lepiej zrozumieć swoje ciało. Użyj tych pomiarów, aby ustawić cele i śledzić postępy."
    },
    {
      image: "assets/nutrition.png",
      title: "Licznik żywieniowy",
      description: "Śledź swoje spożycie kalorii i składników odżywczych, aby utrzymać zrównoważoną dietę. Bądź na bieżąco i podejmuj zdrowe decyzje dotyczące swoich celów fitness."
    },
    {
      image: "assets/products.png",
      title: "Używaj własnych produktów lub produktów innych użytkowników",
      description: "Śledź swoje spożycie kalorii i składników odżywczych, aby utrzymać zrównoważoną dietę. Bądź na bieżąco i podejmuj zdrowe decyzje dotyczące swoich celów fitness."
    }
  ];  
  currentContentIndex = 0;
  intervalId: any;
  autoSlideEnabled = true; 
  autoSlideTimeout: any; 

  constructor(private elRef: ElementRef) { }

  ngOnInit(): void {
    this.startContentSlider();
  }

  startContentSlider() {
    this.intervalId = setInterval(() => {
      if (this.autoSlideEnabled) {
        this.currentContentIndex = (this.currentContentIndex + 1) % this.content.length;
      }
    }, 4000); 
  }

  stopContentSlider() {
    clearInterval(this.intervalId);
  }

  scrollDown() {
    const hero2Section = this.elRef.nativeElement.querySelector('.hero2');
    hero2Section.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
 
  goToContent(index: number) {
    this.currentContentIndex = index;
    this.stopContentSlider(); 
    this.autoSlideEnabled = false; 
    this.autoSlideTimeout = setTimeout(() => {
      this.autoSlideEnabled = true;
      this.startContentSlider();
    }, 1000);
  }

  ngOnDestroy() {
    if (this.autoSlideTimeout) {
      clearTimeout(this.autoSlideTimeout);
    }
  }
}