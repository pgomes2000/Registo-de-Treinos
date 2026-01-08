
import { Workout } from '../types';

const STORAGE_KEY = 'fittrack_workouts';

export const getWorkouts = (): Workout[] => {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
};

export const saveWorkout = (workout: Workout): void => {
  const workouts = getWorkouts();
  workouts.push(workout);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(workouts));
};

export const deleteWorkout = (id: string): void => {
  const workouts = getWorkouts();
  const filtered = workouts.filter(w => w.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
};

export const clearAllWorkouts = (): void => {
  localStorage.removeItem(STORAGE_KEY);
};
