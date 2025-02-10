import { useEffect, useState } from "react";
import axios from "axios";
import { FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const EntryList = () => {
  const [entries, setEntries] = useState([]);
  const navigate = useNavigate();

  const fetchEntries = async () => {
    try {
      const response = await axios.get("http://localhost:5000/entries");
      setEntries(response.data);
    } catch (error) {
      console.error("Fetching error:", error);
    }
  };

  useEffect(() => {
    fetchEntries();
  }, []);

  const deleteEntry = async (id) => {
    await axios.delete(`http://localhost:5000/delete-entry/${id}`);
    fetchEntries();
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "20px",
        backgroundColor: "#f4f4f4",
        minHeight: "100vh",
      }}
    >
      <h1 style={{ color: "#2c3e50" }}>Submitted Entries</h1>
      <button
        onClick={() => navigate("/")}
        style={{
          backgroundColor: "#3498db",
          color: "#fff",
          padding: "10px",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          marginBottom: "10px",
        }}
      >
        Go Back
      </button>
      <div style={{ width: "300px" }}>
        {entries.map((entry) => (
          <div
            key={entry.id}
            style={{
              display: "flex",
              justifyContent: "space-between",
              backgroundColor: "#fff",
              padding: "10px",
              boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
              borderRadius: "5px",
              marginBottom: "10px",
            }}
          >
            <span>
              {entry.name} - {entry.batch} - {entry.size}
            </span>
            <FaTrash
              style={{ color: "red", cursor: "pointer" }}
              onClick={() => deleteEntry(entry.id)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default EntryList;
