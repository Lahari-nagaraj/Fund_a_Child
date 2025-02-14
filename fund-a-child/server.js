const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(express.json()); // Built-in body parser

// Allow CORS for your frontend (Vercel & local development)
const allowedOrigins = [
  "http://localhost:5173", // Local React app
  "https://fund-a-child-bl1gzo780-lahari-priya-ns-projects.vercel.app" // Deployed frontend
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "DELETE"],
    allowedHeaders: ["Content-Type"],
    credentials: true, // Allow cookies (if needed)
  })
);

// Manually set headers for preflight requests
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", allowedOrigins.includes(req.headers.origin) ? req.headers.origin : "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.header("Access-Control-Allow-Credentials", "true");
  if (req.method === "OPTIONS") return res.sendStatus(200);
  next();
});

// Database Connection
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "FCI",
  password: "hari@2013",
  port: 5432,
});

// Add an entry
app.post("/add-entry", async (req, res) => {
  const { name, batch, size } = req.body;
  if (!name || !batch || !size) {
    return res.status(400).json({ error: "All fields are required!" });
  }

  try {
    const result = await pool.query(
      "INSERT INTO tshirt_entries (name, batch, size) VALUES ($1, $2, $3) RETURNING *",
      [name, batch, size]
    );
    res.status(201).json(result.rows[0]); // 201 = Created
  } catch (err) {
    console.error("Database Error:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Fetch entries sorted by batch
app.get("/entries", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM tshirt_entries ORDER BY batch");
    res.json(result.rows);
  } catch (err) {
    console.error("Database Error:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Delete an entry
app.delete("/delete-entry/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query("DELETE FROM tshirt_entries WHERE id = $1 RETURNING *", [id]);
    
    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Entry not found" });
    }
    
    res.json({ message: "Entry deleted successfully" });
  } catch (err) {
    console.error("Database Error:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Start Server
app.listen(port, () => {
  console.log(`✅ Server running on http://localhost:${port}`);
});
