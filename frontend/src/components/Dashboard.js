import React, { useState, useEffect } from "react";
import WorkflowView from "./WorkflowView";
import "./Dashboard.css";

function Dashboard() {

  const [data, setData] = useState({
    ph: "--",
    tds: "--",
    turbidity: "--",
    decision: "Waiting..."
  });

  const [tank, setTank] = useState(40);
  const [time, setTime] = useState("just now");

  useEffect(() => {
    const interval = setInterval(() => {

      const ph = (6 + Math.random() * 2).toFixed(1);
      const tds = Math.floor(200 + Math.random() * 400);
      const turbidity = Math.floor(10 + Math.random() * 60);

      let decision = "Drain Water";
      if (turbidity < 20 && tds < 300) decision = "Washing";
      else if (turbidity < 40) decision = "Toilet";
      else if (turbidity < 60) decision = "Garden";

      setTank(prev => (prev >= 100 ? 30 : prev + 5));

      setData({ ph, tds, turbidity, decision });
      setTime("just now");

    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // 🎯 DECISION COLOR
  const getDecisionColor = () => {
    if (data.decision === "Drain Water") return "#ff6b6b";
    if (data.decision === "Toilet") return "#ffd166";
    if (data.decision === "Garden") return "#00ffa6";
    return "#38bdf8";
  };

  return (
    <div className="dashboard">

      {/* 🔥 HEADER */}
      <h1 className="title">Smart Graywater Dashboard</h1>

      <div className="header-bar">
        <p className="subtitle">Live Water Monitoring System</p>

        <div className="status-badge">
          <span className="dot"></span>
          Active
        </div>
      </div>

      <p className="timestamp">Last Updated: {time}</p>

      {/* 🔁 WORKFLOW */}
      <WorkflowView />

      {/* 📊 GRID */}
      <div className="dashboard-grid">

        <div className="card">
          <h3>Tank Level</h3>
          <div className="tank-bar">
            <div
              className="tank-fill"
              style={{ width: `${tank}%` }}
            ></div>
          </div>
          <p>{tank}% Full</p>
        </div>

        <div className="card">
          <h3>pH Level</h3>
          <h2>{data.ph}</h2>
        </div>

        <div className="card">
          <h3>TDS</h3>
          <h2>{data.tds} ppm</h2>
        </div>

        <div className="card">
          <h3>Turbidity</h3>
          <h2>{data.turbidity} NTU</h2>
        </div>

        <div className="card decision-card">
          <h3>Reuse Decision</h3>
          <h2 style={{ color: getDecisionColor() }}>
            {data.decision}
          </h2>
        </div>

      </div>

      {/* 🎮 SOURCE */}
      <h2 className="source-title">Select Source</h2>

      <div className="source-buttons">
        <button>🚿 Washing</button>
        <button>🚿 Shower</button>
        <button>🍽 Kitchen</button>
      </div>

    </div>
  );
}

export default Dashboard;