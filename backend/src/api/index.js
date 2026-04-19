const express = require("express");
const cors = require("cors");
const connectDB = require("../config/db");
const dotenv = require("dotenv");

const app = express();
dotenv.config();

// FIX: CORS allow frontend domain
app.use(cors({
  origin: "https://hackathon-app-frox.vercel.app",
  credentials: true
}));
app.use(express.json());

//  use existing DB connection
connectDB();

// routes
const authRoutes = require("../routes/authRoutes");
app.use("/api/auth", authRoutes);
app.use("/api/requests", require("../routes/requestRoutes"));
app.use("/api/user", require("../routes/userRoutes"));

app.get("/", (req, res) => {
  res.send("API WORKING ");
});


module.exports = app;