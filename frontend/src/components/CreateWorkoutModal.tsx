"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import CreateWorkoutForm from "./forms/create-workout-form";
import { useState } from "react";

export default function CreateWorkoutModal({
  onWorkoutCreated,
}: {
  onWorkoutCreated?: () => void;
}) {
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
    if (onWorkoutCreated) {
      onWorkoutCreated();
    }
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2" />
          New Workout
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Workout</DialogTitle>
          <DialogDescription>
            Please provide a name for your new workout.
          </DialogDescription>
        </DialogHeader>
        <CreateWorkoutForm onClose={handleClose} />
      </DialogContent>
    </Dialog>
  );
}
