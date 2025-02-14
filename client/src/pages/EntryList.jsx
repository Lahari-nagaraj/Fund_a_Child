import { useEffect, useState } from "react";
import axios from "axios";
import { FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const EntryList = () => {
  const [entries, setEntries] = useState([]);
  const navigate = useNavigate();

  // Get backend URL from environment variables
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  const fetchEntries = async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/entries`, {
        withCredentials: true,
      });
      setEntries(response.data);
    } catch (error) {
      console.error("Fetching error:", error);
      alert("Failed to fetch entries. Check the console for details.");
    }
  };

  useEffect(() => {
    fetchEntries();
  }, []);

  const deleteEntry = async (id) => {
    if (!window.confirm("Are you sure you want to delete this entry?")) return;

    try {
      await axios.delete(`${BACKEND_URL}/delete-entry/${id}`, {
        withCredentials: true,
      });
      alert("Entry deleted successfully!");
      fetchEntries(); // Refresh list
    } catch (error) {
      console.error("Delete error:", error);
      alert("Failed to delete entry.");
    }
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
