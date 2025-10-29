// server/server.js
import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import session from 'express-session';
import passport from 'passport';
import connectDb from './config/db.js';
import passportConfig from './config/passport.js';

import authRoutes from './routes/auth.js';
import searchRoutes from './routes/search.js';
import topRoutes from './routes/topSearches.js';
import historyRoutes from './routes/history.js';

dotenv.config();
const app = express();

// ✅ Initialize DB
await connectDb();

// ✅ Passport Config
passportConfig(passport);

// ✅ Middleware
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5000',
  credentials: true
}));
app.use(express.json());
app.use(session({
  secret: process.env.SESSION_SECRET || 'secret',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === "production",
    httpOnly: true,
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000
  }
}));
app.use(passport.initialize());
app.use(passport.session());

// ✅ Routes
app.use('/api/auth', authRoutes);
app.use('/api', searchRoutes);
app.use('/api', topRoutes);
app.use('/api', historyRoutes);

// ✅ Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
