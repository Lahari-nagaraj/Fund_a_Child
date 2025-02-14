const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { Pool } = require("pg");
require("dotenv").config();

const app = express();
const port = process.env.PORT||5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Database Connection
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

// Add an entry
app.post("/add-entry", async (req, res) => {
  const { name, batch, size } = req.body;
  try {
    const result = await pool.query(
      "INSERT INTO tshirt_entries (name, batch, size) VALUES ($1, $2, $3) RETURNING *",
      [name, batch, size]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
});

// Fetch entries sorted by batch
app.get("/entries", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM tshirt_entries ORDER BY batch");
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
});

// Delete an entry
app.delete("/delete-entry/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query("DELETE FROM tshirt_entries WHERE id = $1", [id]);
    res.json({ message: "Entry deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
});

// Start Server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
