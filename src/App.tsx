import React, { useEffect } from "react";
import "./App.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AppNavigation from "./navigation";

const App = () => {
  useEffect(() => {
    const meta = document.createElement("meta");
    meta.name = "viewport";
    meta.content =
      "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0";
    document.head.appendChild(meta);

    return () => {
      document.head.removeChild(meta);
    };
  }, []);
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
