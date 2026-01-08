
export interface Workout {
  id: string;
  date: string;
  exercise: string;
  sets: number;
  reps: number;
  value: number;
  unit: string; // Kg, Km, Min, etc.
  notes: string;
}

export interface DailySummary {
  date: string;
  totalVolume: number;
  count: number;
}
