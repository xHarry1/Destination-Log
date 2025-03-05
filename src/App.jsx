import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import CreateEntry from "./components/CreateEntry";

function App() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<CreateEntry />} />
      </Routes>
    </div>
  );
}

export default App;
