import express, { Express, Request, Response } from "express";
import { toNodeHandler } from "better-auth/node";
import { auth } from "@/lib/auth";
import cors from "cors";
import "dotenv/config";
import workoutRouter from "./routes/workoutRoute";
import exerciseRouter from "./routes/exerciseRoute";
import setsRouter from "./routes/setsRoute";


const app: Express = express();
const port = process.env.PORT || 3000;

app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:5174"], // Replace with your frontend's origin
    methods: ["GET", "POST", "PUT", "DELETE"], // Specify allowed HTTP methods
    credentials: true, // Allow credentials (cookies, authorization headers, etc.)
  })
);

app.all("/api/auth/*splat", toNodeHandler(auth));

// Mount express json middleware after Better Auth handler
// or only apply it to routes that don't interact with Better Auth
app.use(express.json());


app.use("/api/workouts", workoutRouter);
app.use("/api/exercises", exerciseRouter);
app.use("/api/sets", setsRouter);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
