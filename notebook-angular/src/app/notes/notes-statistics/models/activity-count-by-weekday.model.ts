export interface ActivityCountByWeekday {
    dayOfWeek: string; // Dzień tygodnia
    activities: { [activityType: string]: number }; // Typy aktywności i ich liczba
}