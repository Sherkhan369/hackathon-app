const express = require("express");
const cors = require("cors");
const connectDB = require("../config/db");
const dotenv = require("dotenv");
const authRoutes = require("../routes/authRoutes");

const app = express();
dotenv.config();

app.use(cors());
app.use(express.json());

// ✅ use existing DB connection
connectDB();


// routes
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("API WORKING ✅");
});


module.exports = app;