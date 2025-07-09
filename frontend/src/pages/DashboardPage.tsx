import CreateWorkoutModal from "@/components/CreateWorkoutModal";
import { authClient } from "@/lib/auth-client";
import { useEffect, useState } from "react";

import { Loader2, Trash2, Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import UpdateWorkoutModal from "@/components/UpdateWorkoutModal";
import DeleteConfirmationDialog from "@/components/DeleteConfirmationDialog";
import WorkoutExercises from "@/components/WorkoutExercises";

import type { Workout } from "@/types";
import { API_BASE_URL } from "@/config";
import Logout from "@/components/Logout";

const DashboardPage = () => {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [refreshKey, setRefreshKey] = useState(0);

  const onWorkoutCreated = () => {
    setRefreshKey((prevKey) => prevKey + 1);
  };

  const handleDeleteWorkout = async (workoutId: string) => {
    setIsLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/workouts/${workoutId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to delete workout");
      }

      toast.success("Workout deleted!");
      onWorkoutCreated();
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : "An unknown error occurred";
      toast.error(errorMessage || "Failed to delete workout");
      console.error("Error deleting workout:", errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const fetchWorkouts = async (userId: string) => {
      try {
        const response = await fetch(`${API_BASE_URL}/workouts/${userId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch workouts");
        }
        const data = await response.json();
        setWorkouts(data); // Save fetched data to state
        console.log("Fetched workouts:", data);
      } catch (error) {
        console.error("Error fetching workouts:", error);
      } finally {
        setIsLoading(false);
      }
    };

    const getSessionAndWorkouts = async () => {
      setIsLoading(true);
      try {
        const session = await authClient.getSession();
        const userId = session?.data?.user?.id;
        if (!userId) {
          console.error("User not authenticated");
          setIsLoading(false);
          return;
        }
        fetchWorkouts(userId);
      } catch (error) {
        console.error("Error fetching session:", error);
        setIsLoading(false);
      }
    };
    getSessionAndWorkouts();
  }, [refreshKey]);
  return (
    <div className="min-h-screen py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">💪 Workout Tracker</h1>
          <CreateWorkoutModal onWorkoutCreated={onWorkoutCreated} />
          <Logout />
        </div>
        {/* Workout List */}
        <div>
          <h2 className="text-2xl font-semibold mb-4">Your Workouts</h2>
          {isLoading ? (
            <div className="flex justify-center items-center h-32">
              <Loader2 className="h-8 w-8 animate-spin" />
            </div>
          ) : (
            <ul className="space-y-4">
              {workouts.length === 0 ? (
                <li className="text-gray-500">No workouts found.</li>
              ) : (
                workouts.map((workout: Workout) => (
                  <li
                    key={workout.id}
                    className="p-4 bg-white rounded shadow"
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="font-semibold">
                          {workout.title || "Untitled Workout"}
                        </div>
                        <div className="text-sm text-gray-600">
                          {new Date(workout.createdAt).toLocaleDateString() ||
                            "No date"}
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <UpdateWorkoutModal
                          workout={workout}
                          onUpdate={onWorkoutCreated}
                        >
                          <Button variant="outline" size="icon">
                            <Pencil className="h-4 w-4" />
                          </Button>
                        </UpdateWorkoutModal>
                        <DeleteConfirmationDialog
                          onConfirm={() => handleDeleteWorkout(workout.id)}
                        >
                          <Button variant="destructive" size="icon">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </DeleteConfirmationDialog>
                      </div>
                    </div>
                    <WorkoutExercises 
                      workoutId={workout.id} 
                      initialExercises={workout.exercises || []}
                    />
                  </li>
                ))
              )}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
