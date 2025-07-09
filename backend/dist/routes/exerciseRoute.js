"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const prisma_1 = __importDefault(require("@/lib/prisma"));
const router = (0, express_1.Router)();
// Create a new exercise
router.post("/", ((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { workoutId, name } = req.body;
        if (!workoutId || !name) {
            return res.status(400).json({ error: "Workout ID and name are required." });
        }
        const exercise = yield prisma_1.default.exercise.create({
            data: {
                workoutId,
                name,
            },
        });
        return res.status(201).json(exercise);
    }
    catch (error) {
        console.error("Error creating exercise:", error);
        return res.status(500).json({ error: "Internal server error." });
    }
})));
// Get all exercises for a workout
router.get("/:workoutId", ((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { workoutId } = req.params;
        if (!workoutId) {
            return res.status(400).json({ error: "Workout ID is required." });
        }
        const exercises = yield prisma_1.default.exercise.findMany({
            where: {
                workoutId,
            },
            include: {
                sets: true,
            },
        });
        return res.json(exercises);
    }
    catch (error) {
        console.error("Error fetching exercises:", error);
        return res.status(500).json({ error: "Internal server error." });
    }
})));
// Update an exercise
router.put("/:id", ((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { name } = req.body;
        if (!id || !name) {
            return res.status(400).json({ error: "Exercise ID and name are required." });
        }
        const exercise = yield prisma_1.default.exercise.update({
            where: {
                id,
            },
            data: {
                name,
            },
        });
        return res.json(exercise);
    }
    catch (error) {
        console.error("Error updating exercise:", error);
        return res.status(500).json({ error: "Internal server error." });
    }
})));
// Delete an exercise
router.delete("/:id", ((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ error: "Exercise ID is required." });
        }
        yield prisma_1.default.exercise.delete({
            where: {
                id,
            },
        });
        return res.status(204).send(); // No Content
    }
    catch (error) {
        console.error("Error deleting exercise:", error);
        return res.status(500).json({ error: "Internal server error." });
    }
})));
exports.default = router;
