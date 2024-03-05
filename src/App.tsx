import React from "react";
import "./App.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AppNavigation from "./navigation";

const App = () => {
  return (
    <Router>
      <div className="flex justify-center  ">
        <div className="max-w-[455px] w-full ">
          <Routes>
            <Route path={"/*"} element={<AppNavigation />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
