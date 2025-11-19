import express from "express";
import routes from "./routes.js";
import dotenv from "dotenv";
import cors from "cors";
dotenv.config();

const app = express();
const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:5173";

// TODO: complete me (CORS)

app.use(cors({
  origin: FRONTEND_URL,
  methods: 'GET,POST,DELETE',
  credentials: true
}));

app.options("*", cors());

app.use(express.json());
app.use('', routes);

app.get('/', function (req, res){
    res.send({msg: 'Running with CORS enabled'})
})


app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: "Internal Server Error" });
});

export default app;