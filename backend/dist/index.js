"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const node_1 = require("better-auth/node");
const auth_1 = require("@/lib/auth");
const cors_1 = __importDefault(require("cors"));
require("dotenv/config");
const workoutRoute_1 = __importDefault(require("./routes/workoutRoute"));
const exerciseRoute_1 = __importDefault(require("./routes/exerciseRoute"));
const setsRoute_1 = __importDefault(require("./routes/setsRoute"));
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
app.use((0, cors_1.default)({
    origin: ["http://localhost:5173", "http://localhost:5174"], // Replace with your frontend's origin
    methods: ["GET", "POST", "PUT", "DELETE"], // Specify allowed HTTP methods
    credentials: true, // Allow credentials (cookies, authorization headers, etc.)
}));
app.all("/api/auth/*splat", (0, node_1.toNodeHandler)(auth_1.auth));
// Mount express json middleware after Better Auth handler
// or only apply it to routes that don't interact with Better Auth
app.use(express_1.default.json());
app.use("/api/workouts", workoutRoute_1.default);
app.use("/api/exercises", exerciseRoute_1.default);
app.use("/api/sets", setsRoute_1.default);
app.get("/", (req, res) => {
    res.send("Hello World!");
});
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
