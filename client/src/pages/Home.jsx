import Form from "../components/Form";

function Home() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        backgroundColor: "#f4f4f4",
        textAlign: "center",
      }}
    >
      <h1 style={{ color: "#2c3e50" }}>Fund a Child in India</h1>
      <p>Welcome! Please enter your details below.</p>
      <Form />
    </div>
  );
}

export default Home;
