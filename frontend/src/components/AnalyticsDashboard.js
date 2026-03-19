import React, { useState } from "react";
import "./AnalyticsDashboard.css";

export default function AnalyticsDashboard() {

  const [reuse, setReuse] = useState(120);
  const [garden, setGarden] = useState(60);
  const [cleaning, setCleaning] = useState(80);
  const [drain, setDrain] = useState(40);

  const [running, setRunning] = useState(false);

  const total = reuse + garden + cleaning + drain;
  const efficiency = (reuse / total) * 100;

  // START / STOP SYSTEM
  const toggleSystem = () => {
    setRunning(!running);
  };

  // SIMULATION UPDATE
  const simulate = () => {
    if (!running) return;

    setReuse((r) => Math.min(150, r + 5));
    setDrain((d) => Math.max(0, d - 5));
  };

  React.useEffect(() => {
    const interval = setInterval(simulate, 2000);
    return () => clearInterval(interval);
  }, [running]);

  // STATUS
  const getStatus = () => {
    if (efficiency > 60) return "Efficient";
    if (efficiency > 40) return "Moderate";
    return "Poor";
  };

  const status = getStatus();

  return (
    <div className="analytics-container">

      <h1>Smart Water Control Panel</h1>

      {/* 🎮 CONTROL PANEL */}
      <div className="control-panel">

        <button onClick={toggleSystem}>
          {running ? "Stop System" : "Start System"}
        </button>

        <div className="slider">
          <label>Adjust Reuse Water</label>
          <input
            type="range"
            min="0"
            max="150"
            value={reuse}
            onChange={(e) => setReuse(Number(e.target.value))}
          />
        </div>

      </div>

      {/* 🔥 SUMMARY */}
      <div className="summary-grid">

        <div className="summary-card">
          <h3>Total Water</h3>
          <p>{total} L</p>
        </div>

        <div className="summary-card">
          <h3>Efficiency</h3>
          <p>{efficiency.toFixed(0)}%</p>
        </div>

        <div className="summary-card">
          <h3>Status</h3>
          <p className={`status ${status.toLowerCase()}`}>{status}</p>
        </div>

      </div>

      {/* 🔥 DATA CARDS */}
      <div className="card-grid">

        <Card title="Reused Water" value={reuse} max={150} />
        <Card title="Garden Usage" value={garden} max={100} />
        <Card title="Cleaning Usage" value={cleaning} max={100} />
        <Card title="Drain Water" value={drain} max={100} />

      </div>

      {/* 🧠 AI INSIGHT */}
      <div className="insight-box">
        <h3>AI Insight</h3>
        <p>
          {status === "Efficient"
            ? "System is optimized. Water reuse is high."
            : status === "Moderate"
            ? "System needs improvement."
            : "High wastage detected. Reduce drain usage!"}
        </p>
      </div>

    </div>
  );
}

// CARD COMPONENT
function Card({ title, value, max }) {
  const percent = (value / max) * 100;

  return (
    <div className="analytics-card">
      <h3>{title}</h3>
      <p className="value">{value} L</p>

      <div className="progress-bar">
        <div
          className="progress-fill"
          style={{ width: `${percent}%` }}
        ></div>
      </div>

      <span>{percent.toFixed(0)}%</span>
    </div>
  );
}