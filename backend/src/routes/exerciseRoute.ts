import { Router, Request, Response, RequestHandler } from "express";
import prisma from "@/lib/prisma";

const router = Router();

// Create a new exercise
router.post("/", (async (req: Request, res: Response) => {
  try {
    const { workoutId, name } = req.body;
    if (!workoutId || !name) {
      return res.status(400).json({ error: "Workout ID and name are required." });
    }
    const exercise = await prisma.exercise.create({
      data: {
        workoutId,
        name,
      },
    });
    return res.status(201).json(exercise);
  } catch (error) {
    console.error("Error creating exercise:", error);
    return res.status(500).json({ error: "Internal server error." });
  }
}) as unknown as RequestHandler);

// Get all exercises for a workout
router.get("/:workoutId", (async (req: Request, res: Response) => {
  try {
    const { workoutId } = req.params;
    if (!workoutId) {
      return res.status(400).json({ error: "Workout ID is required." });
    }
    const exercises = await prisma.exercise.findMany({
      where: {
        workoutId,
      },
      include: {
        sets: true,
      },
    });
    return res.json(exercises);
  } catch (error) {
    console.error("Error fetching exercises:", error);
    return res.status(500).json({ error: "Internal server error." });
  }
}) as unknown as RequestHandler);

// Update an exercise
router.put("/:id", (async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    if (!id || !name) {
      return res.status(400).json({ error: "Exercise ID and name are required." });
    }
    const exercise = await prisma.exercise.update({
      where: {
        id,
      },
      data: {
        name,
      },
    });
    return res.json(exercise);
  } catch (error) {
    console.error("Error updating exercise:", error);
    return res.status(500).json({ error: "Internal server error." });
  }
}) as unknown as RequestHandler);

// Delete an exercise
router.delete("/:id", (async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ error: "Exercise ID is required." });
    }
    await prisma.exercise.delete({
      where: {
        id,
      },
    });
    return res.status(204).send(); // No Content
  } catch (error) {
    console.error("Error deleting exercise:", error);
    return res.status(500).json({ error: "Internal server error." });
  }
}) as unknown as RequestHandler);

export default router;
