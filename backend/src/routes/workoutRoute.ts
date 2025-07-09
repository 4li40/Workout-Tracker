import { Router, Request, Response, RequestHandler } from "express";
import prisma from "@/lib/prisma";

const router = Router();

// Create a new workout
router.post("/", (async (req: Request, res: Response) => {
  try {
    const { userId, title } = req.body;
    if (!userId || !title) {
      return res.status(400).json({ error: "User ID and title are required." });
    }
    const workout = await prisma.workout.create({
      data: {
        userId,
        title,
      },
    });
    return res.status(201).json(workout);
  } catch (error) {
    console.error("Error creating workout:", error);
    return res.status(500).json({ error: "Internal server error." });
  }
}) as unknown as RequestHandler);

// Get all workouts for a user
router.get("/:userId", (async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    if (!userId) {
      return res.status(400).json({ error: "User ID is required." });
    }
    const workouts = await prisma.workout.findMany({
      where: {
        userId,
      },
      include: {
        exercises: {
          include: {
            sets: true,
          },
        },
      },
    });
    return res.json(workouts);
  } catch (error) {
    console.error("Error fetching workouts:", error);
    return res.status(500).json({ error: "Internal server error." });
  }
}) as unknown as RequestHandler);

// Update a workout
router.put("/:id", (async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { title } = req.body;
    if (!id || !title) {
      return res.status(400).json({ error: "Workout ID and title are required." });
    }
    const workout = await prisma.workout.update({
      where: {
        id,
      },
      data: {
        title,
      },
    });
    return res.json(workout);
  } catch (error) {
    console.error("Error updating workout:", error);
    return res.status(500).json({ error: "Internal server error." });
  }
}) as unknown as RequestHandler);

// Delete a workout
router.delete("/:id", (async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ error: "Workout ID is required." });
    }
    await prisma.workout.delete({
      where: {
        id,
      },
    });
    return res.status(204).send(); // No Content
  } catch (error) {
    console.error("Error deleting workout:", error);
    return res.status(500).json({ error: "Internal server error." });
  }
}) as unknown as RequestHandler);

export default router;
