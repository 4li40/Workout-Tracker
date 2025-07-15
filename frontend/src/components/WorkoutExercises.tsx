import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronRight, Trash2, Plus, Pencil } from "lucide-react";
import { toast } from "sonner";
import { API_BASE_URL } from "@/config";
import AddExerciseModal from "./AddExerciseModal";
import AddSetModal from "./AddSetModal";
import EditSetModal from "./EditSetModal";
import EditExerciseModal from "./EditExerciseModal";
import DeleteConfirmationDialog from "./DeleteConfirmationDialog";
import type { Exercise } from "@/types";

interface WorkoutExercisesProps {
  workoutId: string;
  initialExercises?: Exercise[];
}

const WorkoutExercises = ({
  workoutId,
  initialExercises = [],
}: WorkoutExercisesProps) => {
  const [exercises, setExercises] = useState<Exercise[]>(initialExercises);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const fetchExercises = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/exercises/${workoutId}`);
      if (!response.ok) {
        throw new Error("Failed to fetch exercises");
      }
      const data = await response.json();
      setExercises(data);
    } catch (error) {
      console.error("Error fetching exercises:", error);
      toast.error("Failed to load exercises");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteExercise = async (exerciseId: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/exercises/${exerciseId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to delete exercise");
      }

      toast.success("Exercise deleted!");
      fetchExercises();
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : "An unknown error occurred";
      toast.error(errorMessage);
      console.error("Error deleting exercise:", errorMessage);
    }
  };

  const handleToggleExpanded = () => {
    setIsExpanded(!isExpanded);
    if (!isExpanded && exercises.length === 0) {
      fetchExercises();
    }
  };

  const onExerciseAdded = () => {
    fetchExercises();
  };

  return (
    <div className="mt-3">
      <div className="flex items-center justify-between">
        <Button
          variant="ghost"
          size="sm"
          onClick={handleToggleExpanded}
          className="flex items-center text-sm text-gray-600 hover:text-gray-800"
        >
          {isExpanded ? (
            <ChevronDown className="h-4 w-4 mr-1" />
          ) : (
            <ChevronRight className="h-4 w-4 mr-1" />
          )}
          {exercises.length > 0
            ? `${exercises.length} exercise${exercises.length !== 1 ? "s" : ""}`
            : "Exercises"}
        </Button>

        {isExpanded && (
          <AddExerciseModal
            workoutId={workoutId}
            onExerciseAdded={onExerciseAdded}
          />
        )}
      </div>

      {isExpanded && (
        <div className="mt-2 pl-4 border-l-2 border-gray-200">
          {isLoading ? (
            <div className="text-sm text-gray-500">Loading exercises...</div>
          ) : exercises.length === 0 ? (
            <div className="text-sm text-gray-500 mb-2">
              No exercises yet. Add your first exercise!
            </div>
          ) : (
            <ul className="space-y-2">
              {exercises.map((exercise) => (
                <li
                  key={exercise.id}
                  className="flex flex-col p-3 bg-gray-50 rounded border"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="font-medium text-sm">{exercise.name}</div>
                      {exercise.sets && exercise.sets.length > 0 && (
                        <div className="text-xs text-gray-500 mt-1">
                          {exercise.sets.length} set
                          {exercise.sets.length !== 1 ? "s" : ""}
                        </div>
                      )}
                    </div>
                    <div className="flex space-x-1">
                      <AddSetModal
                        exerciseId={exercise.id}
                        onSetAdded={fetchExercises}
                      >
                        <Button variant="ghost" size="sm" className="text-xs">
                          <Plus className="h-3 w-3 mr-1" />
                          Add Set
                        </Button>
                      </AddSetModal>
                      <EditExerciseModal
                        exerciseId={exercise.id}
                        initialName={exercise.name}
                        onExerciseEdited={fetchExercises}
                      />
                      <DeleteConfirmationDialog
                        onConfirm={() => handleDeleteExercise(exercise.id)}
                      >
                        <Button variant="ghost" size="sm">
                          <Trash2 className="h-3 w-3 text-red-500" />
                        </Button>
                      </DeleteConfirmationDialog>
                    </div>
                  </div>

                  {/* Display sets */}
                  {exercise.sets && exercise.sets.length > 0 && (
                    <div className="mt-3 space-y-1">
                      {exercise.sets.map((set, index) => (
                        <div
                          key={set.id}
                          className="flex items-center justify-between text-xs bg-white p-2 rounded border"
                        >
                          <span className="font-medium">Set {index + 1}</span>
                          <span className="text-gray-600">
                            {set.weight} lbs × {set.reps} reps
                          </span>
                          <div className="flex space-x-1">
                            <EditSetModal
                              setId={set.id}
                              initialWeight={set.weight}
                              initialReps={set.reps}
                              onSetEdited={fetchExercises}
                            >
                              <Button
                                variant="ghost"
                                size="sm"
                                className="text-xs"
                              >
                                <Pencil className="h-3 w-3 mr-1" />
                                Edit
                              </Button>
                            </EditSetModal>
                            <DeleteConfirmationDialog
                              onConfirm={async () => {
                                try {
                                  const response = await fetch(
                                    `${API_BASE_URL}/sets/${set.id}`,
                                    {
                                      method: "DELETE",
                                    }
                                  );
                                  if (!response.ok) {
                                    const errorData = await response.json();
                                    throw new Error(
                                      errorData.error || "Failed to delete set"
                                    );
                                  }
                                  toast.success("Set deleted!");
                                  fetchExercises();
                                } catch (error: unknown) {
                                  const errorMessage =
                                    error instanceof Error
                                      ? error.message
                                      : "An unknown error occurred";
                                  toast.error(errorMessage);
                                  console.error(
                                    "Error deleting set:",
                                    errorMessage
                                  );
                                }
                              }}
                            >
                              <Button variant="ghost" size="sm">
                                <Trash2 className="h-3 w-3 text-red-500" />
                              </Button>
                            </DeleteConfirmationDialog>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default WorkoutExercises;
