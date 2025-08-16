const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// MongoDB Connect
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Error:", err));

// Import Routes
const productRoutes = require("./routes/productRoutes");
app.use("/api/products", productRoutes);

// Root Route
app.get("/", (req, res) => {
  res.send("🚀 Herbal Store Backend is Running...");
});

// Health Check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

// Server Listen
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
