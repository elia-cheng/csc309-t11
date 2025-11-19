import express from "express";
import routes from "./routes.js";
import dotenv from "dotenv";
import cors from "cors";
dotenv.config();

const app = express();

const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:5173";
// --- CORS FIX ---
app.use(cors({
  origin: FRONTEND_URL,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  credentials: true,
}));
app.options("*", cors()); // handle preflight
// -----------------

app.use(express.json());
app.use("", routes);

app.get("/", (req, res) => {
  res.send({ msg: "Running with CORS enabled" });
});

export default app;
