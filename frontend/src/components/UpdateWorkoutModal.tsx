"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { useState } from "react";
import UpdateWorkoutForm from "./update-workout-form";
import type { Workout } from "@/types";

export default function UpdateWorkoutModal({
  workout,
  onUpdate,
  children,
}: {
  workout: Workout;
  onUpdate?: () => void;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
    if (onUpdate) {
      onUpdate();
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update Workout</DialogTitle>
          <DialogDescription>
            Edit the name of your workout.
          </DialogDescription>
        </DialogHeader>
        <UpdateWorkoutForm workout={workout} onClose={handleClose} onUpdate={onUpdate} />
      </DialogContent>
    </Dialog>
  );
}
