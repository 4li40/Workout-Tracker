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
    <div className="min-h-screen py-6 sm:py-8 bg-background">
      <div className="max-w-4xl mx-auto px-2 sm:px-4">
        {/* Header */}
        <header className="flex flex-col sm:flex-row items-center sm:items-center justify-between mb-8 sm:mb-10 p-4 sm:p-6 bg-gradient-to-r from-primary to-accent rounded-xl shadow-lg text-primary-foreground relative overflow-hidden gap-4 sm:gap-0">
          <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto justify-center sm:justify-start">
            <span className="text-3xl sm:text-4xl">💪</span>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight drop-shadow-lg">
              Workout Tracker
            </h1>
          </div>
          <div className="flex items-center gap-2 w-full sm:w-auto justify-center sm:justify-end">
            <CreateWorkoutModal onWorkoutCreated={onWorkoutCreated} />
            <Logout />
          </div>
          <div className="absolute right-0 top-0 opacity-10 pointer-events-none select-none">
            <svg width="120" height="120" fill="none" viewBox="0 0 120 120">
              <circle cx="60" cy="60" r="60" fill="white" />
            </svg>
          </div>
        </header>
        {/* Workout List */}
        <div>
          <h2 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4 text-foreground">
            Your Workouts
          </h2>
          {isLoading ? (
            <div className="flex justify-center items-center h-32">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : (
            <ul className="space-y-3 sm:space-y-4">
              {workouts.length === 0 ? (
                <li className="text-muted-foreground">No workouts found.</li>
              ) : (
                workouts.map((workout: Workout) => (
                  <li
                    key={workout.id}
                    className="p-0 bg-transparent rounded shadow-none"
                  >
                    <div className="bg-card rounded-lg shadow-md p-4 sm:p-6 flex flex-col gap-3 sm:gap-4">
                      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-0">
                        <div className="flex-1 w-full">
                          <div className="font-semibold text-base sm:text-lg text-card-foreground">
                            {workout.title || "Untitled Workout"}
                          </div>
                          <div className="text-xs sm:text-sm text-muted-foreground">
                            {new Date(workout.createdAt).toLocaleDateString() ||
                              "No date"}
                          </div>
                        </div>
                        <div className="flex space-x-2 mt-2 sm:mt-0">
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
                    </div>
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
