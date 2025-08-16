const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());

// MongoDB Atlas Connect (from Railway ENV)
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Error:", err));

// Root Route
app.get("/", (req, res) => {
  res.send("🚀 Herbal Store Backend is Running...");
});

// Health Check Route
app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

// Example Products Route
app.get("/api/products", (req, res) => {
  res.json([{ id: 1, name: "Herbal Tea" }, { id: 2, name: "Honey" }]);
});

// Server Listen
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
