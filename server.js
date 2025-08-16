// server.js (Node + Express + MongoDB)
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const MONGODB_URI = process.env.MONGODB_URI;
const ADMIN_KEY = process.env.ADMIN_KEY;

mongoose.connect(MONGODB_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch(err => {
    console.error("❌ MongoDB error:", err.message);
    process.exit(1);
  });

const Product = mongoose.model("Product", new mongoose.Schema({
  name: String,
  category: String,
  price: Number,
  image: String,
  details: String
}, { timestamps: true }));

app.get("/api/products", async (req, res) => {
  const list = await Product.find().sort({ createdAt: -1 });
  res.json(list);
});

function requireAdmin(req, res, next) {
  if (req.header("x-admin-key") !== ADMIN_KEY) return res.status(401).json({ error: "Unauthorized" });
  next();
}

app.post("/api/products", requireAdmin, async (req, res) => {
  const doc = await Product.create(req.body);
  res.status(201).json(doc);
});

app.put("/api/products/:id", requireAdmin, async (req, res) => {
  const doc = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(doc);
});

app.delete("/api/products/:id", requireAdmin, async (req, res) => {
  const doc = await Product.findByIdAndDelete(req.params.id);
  res.json({ success: true });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("🚀 API running on port", PORT));
