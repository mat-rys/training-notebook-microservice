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
      image: "assets\\profile.png",
      title: "Personal Accounts",
      description: "Create your account for easy access to Training Notebook.Take control of your fitness journey with personalized tools and features."
    },
    {
      image: "assets\\notes.png",
      title: "Create notes",
      description: "Keep notes on workouts, goals, and achievements. Stay organized and motivated with easy note-taking."
    },
    {
      image: "assets\\bmi.png",
      title: "BMI and BMR Calculator",
      description: "Determine your Body Mass Index (BMI) and Basal Metabolic Rate (BMR) to understand your body better. Use these measurements to set goals and track progress."
    },
    {
      image: "assets\\nutrition.png",
      title: "Nutrition Counter",
      description: "Track your calorie and nutrient intake for a balanced diet. Stay informed and make healthy choices for your fitness goals."
    },
    {
      image: "assets\\products.png",
      title: "Use your own products or others users",
      description: "Track your calorie and nutrient intake for a balanced diet. Stay informed and make healthy choices for your fitness goals."
    }
  ];
  currentContentIndex = 0;
  intervalId: any;
  autoSlideEnabled = true; // Flaga określająca, czy automatyczne przełączanie jest włączone
  autoSlideTimeout: any; // Zmienna do przechowywania identyfikatora timeout

  constructor(private elRef: ElementRef) { }

  ngOnInit(): void {
    this.startContentSlider();
  }

  startContentSlider() {
    this.intervalId = setInterval(() => {
      if (this.autoSlideEnabled) {
        this.currentContentIndex = (this.currentContentIndex + 1) % this.content.length;
      }
    }, 4000); // zmień treść co 5 sekund
  }


  stopContentSlider() {
    clearInterval(this.intervalId);
  }

  scrollDown() {
    const hero2Section = this.elRef.nativeElement.querySelector('.hero2');
    hero2Section.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
 
  scrollTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  goToContent(index: number) {
    this.currentContentIndex = index;
    this.stopContentSlider(); // Zatrzymaj automatyczne przełączanie
    this.autoSlideEnabled = false; // Wyłącz automatyczne przełączanie

    // Ustaw timeout, aby wznowić automatyczne przełączanie po 5 sekundach
    this.autoSlideTimeout = setTimeout(() => {
      this.autoSlideEnabled = true;
      this.startContentSlider();
    }, 1000);
  }

  ngOnDestroy() {
    // Upewnij się, żeby wyczyścić timeout, gdy komponent jest niszczony, aby uniknąć wycieków pamięci
    if (this.autoSlideTimeout) {
      clearTimeout(this.autoSlideTimeout);
    }
  }
}