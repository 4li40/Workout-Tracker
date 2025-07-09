import { Router, Request, Response, RequestHandler } from "express";
import prisma from "@/lib/prisma";

const router = Router();

// Create a new set
router.post("/", (async (req: Request, res: Response) => {
  try {
    const { exerciseId, weight, reps } = req.body;
    if (!exerciseId || weight === undefined || reps === undefined) {
      return res.status(400).json({ error: "Exercise ID, weight, and reps are required." });
    }
    if (typeof weight !== 'number' || typeof reps !== 'number') {
      return res.status(400).json({ error: "Weight and reps must be numbers." });
    }
    const set = await prisma.set.create({
      data: {
        exerciseId,
        weight,
        reps,
      },
    });
    return res.status(201).json(set);
  } catch (error) {
    console.error("Error creating set:", error);
    return res.status(500).json({ error: "Internal server error." });
  }
}) as unknown as RequestHandler);

// Get all sets for an exercise
router.get("/:exerciseId", (async (req: Request, res: Response) => {
  try {
    const { exerciseId } = req.params;
    if (!exerciseId) {
      return res.status(400).json({ error: "Exercise ID is required." });
    }
    const sets = await prisma.set.findMany({
      where: {
        exerciseId,
      },
    });
    return res.json(sets);
  } catch (error) {
    console.error("Error fetching sets:", error);
    return res.status(500).json({ error: "Internal server error." });
  }
}) as unknown as RequestHandler);

// Update a set
router.put("/:id", (async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { weight, reps } = req.body;
    if (!id || weight === undefined || reps === undefined) {
      return res.status(400).json({ error: "Set ID, weight, and reps are required." });
    }
    if (typeof weight !== 'number' || typeof reps !== 'number') {
      return res.status(400).json({ error: "Weight and reps must be numbers." });
    }
    const set = await prisma.set.update({
      where: {
        id,
      },
      data: {
        weight,
        reps,
      },
    });
    return res.json(set);
  } catch (error) {
    console.error("Error updating set:", error);
    return res.status(500).json({ error: "Internal server error." });
  }
}) as unknown as RequestHandler);

// Delete a set
router.delete("/:id", (async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ error: "Set ID is required." });
    }
    await prisma.set.delete({
      where: {
        id,
      },
    });
    return res.status(204).send(); // No Content
  } catch (error) {
    console.error("Error deleting set:", error);
    return res.status(500).json({ error: "Internal server error." });
  }
}) as unknown as RequestHandler);

export default router;
