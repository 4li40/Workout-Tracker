
import { Exercise } from "./Exercise";
import type { Workout as WorkoutType, Exercise as ExerciseType } from "@/types";

export const Workout = ({ workout }: { workout: WorkoutType }) => {
  return (
    <div>
      <h2>{workout.title}</h2>
      {workout.exercises?.map((exercise: ExerciseType) => (
        <Exercise key={exercise.id} exercise={exercise} />
      ))}
    </div>
  );
};