

import type { Set as SetType } from "@/types";

export const Set = ({ set }: { set: SetType }) => {
  return (
    <div>
      <p>
        {set.weight} kg x {set.reps} reps
      </p>
    </div>
  );
};