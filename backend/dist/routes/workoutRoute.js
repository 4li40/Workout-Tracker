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
// Create a new workout
router.post("/", ((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId, title } = req.body;
        if (!userId || !title) {
            return res.status(400).json({ error: "User ID and title are required." });
        }
        const workout = yield prisma_1.default.workout.create({
            data: {
                userId,
                title,
            },
        });
        return res.status(201).json(workout);
    }
    catch (error) {
        console.error("Error creating workout:", error);
        return res.status(500).json({ error: "Internal server error." });
    }
})));
// Get all workouts for a user
router.get("/:userId", ((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        if (!userId) {
            return res.status(400).json({ error: "User ID is required." });
        }
        const workouts = yield prisma_1.default.workout.findMany({
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
    }
    catch (error) {
        console.error("Error fetching workouts:", error);
        return res.status(500).json({ error: "Internal server error." });
    }
})));
// Update a workout
router.put("/:id", ((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { title } = req.body;
        if (!id || !title) {
            return res.status(400).json({ error: "Workout ID and title are required." });
        }
        const workout = yield prisma_1.default.workout.update({
            where: {
                id,
            },
            data: {
                title,
            },
        });
        return res.json(workout);
    }
    catch (error) {
        console.error("Error updating workout:", error);
        return res.status(500).json({ error: "Internal server error." });
    }
})));
// Delete a workout
router.delete("/:id", ((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ error: "Workout ID is required." });
        }
        yield prisma_1.default.workout.delete({
            where: {
                id,
            },
        });
        return res.status(204).send(); // No Content
    }
    catch (error) {
        console.error("Error deleting workout:", error);
        return res.status(500).json({ error: "Internal server error." });
    }
})));
exports.default = router;
