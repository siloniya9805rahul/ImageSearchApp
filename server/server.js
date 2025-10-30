// server/server.js
import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import session from "express-session";
import MongoStore from "connect-mongo";
import passport from "passport";
import connectDb from "./config/db.js";
import passportConfig from "./config/passport.js";

import authRoutes from "./routes/auth.js";
import searchRoutes from "./routes/search.js";
import topRoutes from "./routes/topSearches.js";
import historyRoutes from "./routes/history.js";

dotenv.config();
const app = express();

// ✅ Needed for secure cookies on Render
app.set("trust proxy", 1);

// ✅ Connect to MongoDB
await connectDb();

// ✅ Passport configuration
passportConfig(passport);

// ✅ CORS setup (allow both local + deployed frontend)
const allowedOrigins = [
  "http://localhost:5173",
  "https://imgsrch.vercel.app" // ✅ your frontend URL
];
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        console.log("❌ Blocked by CORS:", origin);
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true, // ✅ Allow cookies
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ Session setup (persistent storage)
app.use(
  session({
    secret: process.env.SESSION_SECRET || "default_secret",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URI, // ✅ stores sessions in MongoDB
      collectionName: "sessions",
    }),
    cookie: {
      secure: process.env.NODE_ENV === "production", 
      httpOnly: true,
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000, 
    },
  })
);

// ✅ Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

// ✅ Routes
app.use("/api/auth", authRoutes);
app.use("/api", searchRoutes);
app.use("/api", topRoutes);
app.use("/api", historyRoutes);



// ✅ Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
