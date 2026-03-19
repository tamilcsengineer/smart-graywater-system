import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Dashboard from "./components/Dashboard";
import WaterMonitoring from "./components/WaterMonitoring";
import TankLevel from "./components/TankLevel";
import AnalyticsDashboard from "./components/AnalyticsDashboard";
import AdvancedSimulation from "./components/AdvancedSimulation";
import ControlPanel from "./components/ControlPanel";

<Route path="/control" element={<ControlPanel />} />

function App() {

  const tankLevel = 65;

  return (
    <Router>
      <Navbar />

      <div className="page-container">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/monitoring" element={<WaterMonitoring />} />
          <Route path="/tank" element={<TankLevel tankLevel={tankLevel} />} />
          <Route path="/analytics" element={<AnalyticsDashboard />} />

          {/* ✅ FIXED: Use AdvancedSimulation */}
          <Route path="/simulation" element={<AdvancedSimulation />} />
        </Routes>
      </div>

    </Router>
  );
}

export default App;