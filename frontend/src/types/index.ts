export interface Workout {
  id: string;
  userId: string;
  title: string;
  createdAt: string; // ISO 8601 string
  updatedAt: string; // ISO 8601 string
  exercises?: Exercise[]; // If exercises are included
}

export interface Exercise {
  id: string;
  workoutId: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  sets?: Set[];
}

export interface Set {
  id: string;
  exerciseId: string;
  weight: number;
  reps: number;
  createdAt: string;
  updatedAt: string;
}