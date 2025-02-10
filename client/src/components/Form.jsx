import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Form = () => {
  const [name, setName] = useState("");
  const [batch, setBatch] = useState("B3");
  const [size, setSize] = useState("M");
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (!name) return alert("Name is required!");

    try {
      await axios.post("http://localhost:5000/add-entry", {
        name,
        batch,
        size,
      });
      setName(""); // Reset form after submission
      navigate("/entries"); // Navigate to Entry List page
    } catch (error) {
      console.error("Submission error:", error);
      alert("Failed to submit data");
    }
  };

  return (
    <form
      style={{
        backgroundColor: "#fff",
        padding: "20px",
        boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
        borderRadius: "8px",
        width: "300px",
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        alignItems: "center",
      }}
    >
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={{
          width: "100%",
          padding: "10px",
          border: "1px solid #ddd",
          borderRadius: "5px",
        }}
        required
      />
      <select
        value={batch}
        onChange={(e) => setBatch(e.target.value)}
        style={{ width: "100%", padding: "10px", borderRadius: "5px" }}
      >
        <option value="B3">B3</option>
        <option value="B4">B4</option>
        <option value="B5">B5</option>
        <option value="B6">B6</option>
      </select>
      <select
        value={size}
        onChange={(e) => setSize(e.target.value)}
        style={{ width: "100%", padding: "10px", borderRadius: "5px" }}
      >
        <option value="S">S</option>
        <option value="M">M</option>
        <option value="L">L</option>
        <option value="XL">XL</option>
      </select>
      <button
        type="button"
        onClick={handleSubmit}
        style={{
          backgroundColor: "#3498db",
          color: "#fff",
          padding: "10px",
          border: "none",
          borderRadius: "5px",
          width: "100%",
          cursor: "pointer",
        }}
      >
        Submit
      </button>
    </form>
  );
};

export default Form;
