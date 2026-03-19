import React, { useEffect, useState } from "react";
import "./AdvancedSimulation.css";
import { Line } from "react-chartjs-2";
import "chart.js/auto";



import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
} from "chart.js";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement
);


export default function AdvancedSimulation() {
  const [ph, setPh] = useState(7);
  const [tds, setTds] = useState(150);
  const [turbidity, setTurbidity] = useState(20);
  const [tankLevel, setTankLevel] = useState(40);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const newPh = (Math.random() * 2 + 6).toFixed(2);
      const newTds = Math.floor(Math.random() * 500);
      const newTurb = Math.floor(Math.random() * 60);

      setPh(newPh);
      setTds(newTds);
      setTurbidity(newTurb);

      setTankLevel((prev) => (prev >= 100 ? 10 : prev + 5));

      setHistory((prev) => [
        ...prev.slice(-10),
        { ph: newPh, tds: newTds, turbidity: newTurb },
      ]);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const getDecision = () => {
    if (turbidity < 20 && tds < 300) return "Reuse for Washing";
    if (turbidity < 40) return "Toilet Flushing";
    if (turbidity < 60) return "Gardening";
    return "Drain Water";
  };

  const decision = getDecision();

  // 🧠 AI Explanation
  const explanation = `Based on turbidity (${turbidity}) and TDS (${tds}), 
the water quality is ${
    turbidity < 20 ? "good" : turbidity < 40 ? "moderate" : "poor"
  }. Hence, the system suggests: ${decision}.`;

  const chartData = {
    labels: history.map((_, i) => i + 1),
    datasets: [
      {
        label: "TDS",
        data: history.map((d) => d.tds),
        borderColor: "#36c2ff",
        tension: 0.4,
      },
      {
        label: "Turbidity",
        data: history.map((d) => d.turbidity),
        borderColor: "#ff7b7b",
        tension: 0.4,
      },
    ],
  };

  return (
    <div className="advanced-container">

      <h1 className="title">Smart Water Simulation</h1>

      {/* 💧 PIPELINE */}
      <div className="pipeline">
        <div className="pipe">
          <div className="flow"></div>
        </div>
      </div>

      {/* 🎯 GAUGES */}
      <div className="gauges">
        <Gauge label="pH" value={ph} max={14} />
        <Gauge label="TDS" value={tds} max={500} />
        <Gauge label="Turbidity" value={turbidity} max={100} />
      </div>

      {/* 🌊 TANK */}
      <div className="tank">
        <div className="water" style={{ height: `${tankLevel}%` }}></div>
        <span className="tank-text">{tankLevel}%</span>
      </div>

      {/* 📊 CHART */}
      <div className="chart">
        <Line data={chartData} />
      </div>

      {/* 🧠 AI DECISION */}
      <div className="decision">
        <h2>AI Decision</h2>
        <p>{decision}</p>
        <small>{explanation}</small>
      </div>

    </div>
  );
}

// 🎯 GAUGE
function Gauge({ label, value, max }) {
  const percent = (value / max) * 100;

  return (
    <div className="gauge">
      <div
        className="circle"
        style={{
          background: `conic-gradient(#36c2ff ${percent}%, #1a2a40 ${percent}%)`,
        }}
      >
        <div className="inner">
          <h3>{value}</h3>
          <p>{label}</p>
        </div>
      </div>
    </div>
  );
}