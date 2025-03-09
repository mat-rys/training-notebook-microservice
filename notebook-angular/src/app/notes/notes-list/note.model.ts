// used in notes-list

export interface Note {
    id: number;
    title: string;
    activityType: string;
    startDate: Date;
    endDate: Date;
    description: string;
    userId: string;
  }