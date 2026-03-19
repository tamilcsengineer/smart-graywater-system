import React, { useState } from "react";
import "./ControlPanel.css";

export default function ControlPanel() {

  const [flow, setFlow] = useState("STOPPED");
  const [mode, setMode] = useState("AUTO");
  const [reuse, setReuse] = useState("None");

  return (
    <div className="control-container">

      <h1>Water Control Panel</h1>

      {/* MODE */}
      <div className="control-card">
        <h3>System Mode</h3>
        <button onClick={() => setMode("AUTO")}>Auto</button>
        <button onClick={() => setMode("MANUAL")}>Manual</button>
        <p>Current: {mode}</p>
      </div>

      {/* FLOW CONTROL */}
      <div className="control-card">
        <h3>Water Flow</h3>
        <button onClick={() => setFlow("STARTED")}>Start</button>
        <button onClick={() => setFlow("STOPPED")}>Stop</button>
        <p>Status: {flow}</p>
      </div>

      {/* REUSE CONTROL */}
      <div className="control-card">
        <h3>Reuse Selection</h3>
        <button onClick={() => setReuse("Washing")}>Washing</button>
        <button onClick={() => setReuse("Toilet")}>Toilet</button>
        <button onClick={() => setReuse("Garden")}>Garden</button>
        <p>Selected: {reuse}</p>
      </div>

      {/* TANK CONTROL */}
      <div className="control-card">
        <h3>Tank Control</h3>
        <button>Fill</button>
        <button>Drain</button>
      </div>

    </div>
  );
}