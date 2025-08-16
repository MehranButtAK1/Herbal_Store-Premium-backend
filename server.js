// server.js (Node + Express + MongoDB)
import express from "express";
import mongoose from "mongoose";

const app = express();
app.use(express.json());

// MongoDB Atlas se connect
const uri = process.env.MONGO_URI;

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.error("❌ Error connecting MongoDB:", err));

app.get("/api/health", (req, res) => {
  res.json({ ok: true });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
