import { NativeDateAdapter, DateAdapter } from '@angular/material/core';

export class CustomDateAdapter extends NativeDateAdapter {
  constructor() {
    super();
  }

  // Przesuwamy dni, aby pierwszy dzień tygodnia był poniedziałkiem
  override getFirstDayOfWeek(): number {
    return 1; // 0: Sunday, 1: Monday
  }
}
