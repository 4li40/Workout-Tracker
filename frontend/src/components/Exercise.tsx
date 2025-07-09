
import { Set } from "./Set";
import type { Exercise as ExerciseType, Set as SetType } from "@/types";

export const Exercise = ({ exercise }: { exercise: ExerciseType }) => {
  return (
    <div>
      <h3>{exercise.name}</h3>
      {exercise.sets?.map((set: SetType) => (
        <Set key={set.id} set={set} />
      ))}
    </div>
  );
};