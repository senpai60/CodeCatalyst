import "dotenv/config";
import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";
import cors from "cors";
import { fileURLToPath } from "url";
import { dirname } from "path";

import indexRouter from "./routes/index.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

// === CORS SETUP === //
const whitelist = [
  "http://localhost:5173",
  "http://127.0.0.1:5173", // some browsers use this
  "http://localhost:3000", // optional: if frontend ever runs on same port
];

const corsOptions = {
  origin: (origin, callback) => {
    // Allow requests with no origin (like Postman or backend-to-backend)
    if (!origin || whitelist.includes(origin)) {
      callback(null, true);
    } else {
      console.error("❌ CORS blocked for origin:", origin);
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  credentials: true,
};

app.use(cors(corsOptions));


app.use(cors(corsOptions));

//=================//

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);

export default app;
