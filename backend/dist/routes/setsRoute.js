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
// Create a new set
router.post("/", ((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { exerciseId, weight, reps } = req.body;
        if (!exerciseId || weight === undefined || reps === undefined) {
            return res.status(400).json({ error: "Exercise ID, weight, and reps are required." });
        }
        if (typeof weight !== 'number' || typeof reps !== 'number') {
            return res.status(400).json({ error: "Weight and reps must be numbers." });
        }
        const set = yield prisma_1.default.set.create({
            data: {
                exerciseId,
                weight,
                reps,
            },
        });
        return res.status(201).json(set);
    }
    catch (error) {
        console.error("Error creating set:", error);
        return res.status(500).json({ error: "Internal server error." });
    }
})));
// Get all sets for an exercise
router.get("/:exerciseId", ((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { exerciseId } = req.params;
        if (!exerciseId) {
            return res.status(400).json({ error: "Exercise ID is required." });
        }
        const sets = yield prisma_1.default.set.findMany({
            where: {
                exerciseId,
            },
        });
        return res.json(sets);
    }
    catch (error) {
        console.error("Error fetching sets:", error);
        return res.status(500).json({ error: "Internal server error." });
    }
})));
// Update a set
router.put("/:id", ((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { weight, reps } = req.body;
        if (!id || weight === undefined || reps === undefined) {
            return res.status(400).json({ error: "Set ID, weight, and reps are required." });
        }
        if (typeof weight !== 'number' || typeof reps !== 'number') {
            return res.status(400).json({ error: "Weight and reps must be numbers." });
        }
        const set = yield prisma_1.default.set.update({
            where: {
                id,
            },
            data: {
                weight,
                reps,
            },
        });
        return res.json(set);
    }
    catch (error) {
        console.error("Error updating set:", error);
        return res.status(500).json({ error: "Internal server error." });
    }
})));
// Delete a set
router.delete("/:id", ((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ error: "Set ID is required." });
        }
        yield prisma_1.default.set.delete({
            where: {
                id,
            },
        });
        return res.status(204).send(); // No Content
    }
    catch (error) {
        console.error("Error deleting set:", error);
        return res.status(500).json({ error: "Internal server error." });
    }
})));
exports.default = router;
