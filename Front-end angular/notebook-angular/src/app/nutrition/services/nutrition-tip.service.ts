import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { NutritionTip } from '../meals-list/models/advice.model';

@Injectable({
  providedIn: 'root'
})
export class NutritionTipService {
  constructor(private http: HttpClient) {}

  getNutritionTips(): Observable<NutritionTip[]> {
    return this.http.get<NutritionTip[]>('./assets/advices.json');
  }

  getRandomSortedNutritionTip(): Observable<NutritionTip> {
    return this.getNutritionTips().pipe(
      map(tips => {
        tips.sort((a, b) => a.tip.localeCompare(b.tip));
        const randomIndex = Math.floor(Math.random() * tips.length);
        return tips[randomIndex];
      })
    );
  }

  getRandomImage(): string {
    const images = ['assets/milkshake.png', 'assets/banana.png', 'assets/sushi.png',
     'assets/broccoli.png', 'assets/pancakes.png', 'assets/sushi2.png', 'assets/avocado.png'];
    const randomIndex = Math.floor(Math.random() * images.length);
    return images[randomIndex];
  }
}
