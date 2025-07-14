const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");

const userRoutes = require("./routes/UserRoutes"); // ✅ Auth/User routes
const aiRoutes = require("./routes/aiRoutes");     // ✅ Gemini route

dotenv.config();

const app = express();

// Middlewares
app.use(express.json());
app.use(cors());

// Routes
app.use("/api/users", userRoutes); // ✅ Auth routes
app.use("/api/ai", aiRoutes);      // ✅ Gemini AI routes

app.get("/", (req, res) => {
  res.send("API is running...");
});

const PORT = process.env.PORT || 3000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB connected");

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    }).on("error", (err) => {
      console.error("❌ Server failed to start:", err.message);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err.message);
  });
