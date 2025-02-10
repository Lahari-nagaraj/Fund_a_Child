import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import EntryList from "./pages/EntryList";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/entries" element={<EntryList />} />
    </Routes>
  );
}

export default App;
