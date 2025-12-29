import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { Toaster } from "@/components/ui/toaster";
import Portfolio from "@/pages/Portfolio";

function App() {
  return (
    <div className="min-h-screen bg-white text-black">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Portfolio />} />
        </Routes>
      </BrowserRouter>
      <Toaster />
    </div>
  );
}

export default App;
