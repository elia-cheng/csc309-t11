import express from "express";
import routes from "./routes.js";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const FRONTEND_URL = process.env.FRONTEND_URL;

// TODO: complete me (CORS)
const allowedOrigins = [
  "http://localhost:5173",
  FRONTEND_URL
];

app.use(cors({
  origin: function(origin, callback) {
    if (!origin) return callback(null, true); 
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("CORS not allowed"));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.options("*", cors({
  origin: allowedOrigins,
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());
app.use('', routes);

app.get('/', function (req, res){
    res.send({msg: 'Running with CORS enabled'})
})


export default app;