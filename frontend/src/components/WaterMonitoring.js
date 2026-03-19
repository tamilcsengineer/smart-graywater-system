import React, { useEffect, useState } from "react";
import "./WaterMonitoring.css";

const sourceProfiles = {
  "Washing Machine": {
    ph: [6.5, 8.2],
    tds: [180, 320],
    turbidity: [10, 35],
    temperature: [24, 33],
  },
  Shower: {
    ph: [6.8, 7.8],
    tds: [120, 250],
    turbidity: [5, 20],
    temperature: [25, 31],
  },
  "Kitchen Sink": {
    ph: [5.8, 7.2],
    tds: [220, 450],
    turbidity: [20, 60],
    temperature: [26, 38],
  },
};

function getRandomValue(min, max, decimals = 1) {
  return (Math.random() * (max - min) + min).toFixed(decimals);
}

function getWaterDecision(turbidity, tds) {
  if (turbidity < 20 && tds < 300) return "Suitable for Washing";
  if (turbidity < 40) return "Suitable for Toilet Flushing";
  if (turbidity < 60) return "Suitable for Gardening";
  return "Drain / Further Treatment Needed";
}

function getStatus(label, value) {
  if (label === "pH") {
    if (value >= 6.5 && value <= 8.5) return "Safe";
    return "Warning";
  }
  if (label === "TDS") {
    if (value < 300) return "Safe";
    if (value < 450) return "Moderate";
    return "Warning";
  }
  if (label === "Turbidity") {
    if (value < 20) return "Safe";
    if (value < 40) return "Moderate";
    return "Warning";
  }
  if (label === "Temperature") {
    if (value < 32) return "Safe";
    return "Moderate";
  }
  return "Safe";
}

export default function WaterMonitoring() {
  const [selectedSource, setSelectedSource] = useState("Washing Machine");
  const [sensorData, setSensorData] = useState({
    ph: "--",
    tds: "--",
    turbidity: "--",
    temperature: "--",
  });
  const [lastUpdated, setLastUpdated] = useState("");

  useEffect(() => {
    const updateSensorData = () => {
      const profile = sourceProfiles[selectedSource];

      const newData = {
        ph: parseFloat(getRandomValue(profile.ph[0], profile.ph[1])),
        tds: parseFloat(getRandomValue(profile.tds[0], profile.tds[1], 0)),
        turbidity: parseFloat(
          getRandomValue(profile.turbidity[0], profile.turbidity[1], 0)
        ),
        temperature: parseFloat(
          getRandomValue(profile.temperature[0], profile.temperature[1], 1)
        ),
      };

      setSensorData(newData);
      setLastUpdated(new Date().toLocaleTimeString());
    };

    updateSensorData();
    const interval = setInterval(updateSensorData, 3000);

    return () => clearInterval(interval);
  }, [selectedSource]);

  const decision = getWaterDecision(sensorData.turbidity, sensorData.tds);

  const cards = [
    {
      title: "pH Level",
      short: "pH",
      value: sensorData.ph,
      unit: "",
    },
    {
      title: "TDS Level",
      short: "TDS",
      value: sensorData.tds,
      unit: "ppm",
    },
    {
      title: "Turbidity",
      short: "Turbidity",
      value: sensorData.turbidity,
      unit: "NTU",
    },
    {
      title: "Temperature",
      short: "Temperature",
      value: sensorData.temperature,
      unit: "°C",
    },
  ];

  return (
    <div className="monitoring-page">
      

      <div className="monitoring-container">
        <div className="monitoring-header">
          <div>
            <h1>Water Monitoring System</h1>
            <p>Real-time simulation of graywater quality parameters</p>
          </div>
          <div className="live-indicator">
            <span className="pulse-dot"></span>
            Live Simulation
          </div>
        </div>

        <div className="source-tabs">
          {Object.keys(sourceProfiles).map((source) => (
            <button
              key={source}
              className={selectedSource === source ? "tab active-tab" : "tab"}
              onClick={() => setSelectedSource(source)}
            >
              {source}
            </button>
          ))}
        </div>

        <div className="sensor-grid">
          {cards.map((card, index) => {
            const status = getStatus(card.short, card.value);
            return (
              <div className="sensor-card" key={index}>
                <div className="card-top">
                  <h3>{card.title}</h3>
                  <span className={`status-badge ${status.toLowerCase()}`}>
                    {status}
                  </span>
                </div>
                <div className="sensor-value">
                  {card.value} <span>{card.unit}</span>
                </div>
              </div>
            );
          })}
        </div>

        <div className="summary-panel">
          <div className="summary-card">
            <h2>Simulation Summary</h2>
            <div className="summary-row">
              <span>Selected Source</span>
              <strong>{selectedSource}</strong>
            </div>
            <div className="summary-row">
              <span>Water Quality</span>
              <strong>
                {sensorData.turbidity < 20 ? "Good" : sensorData.turbidity < 40 ? "Moderate" : "Poor"}
              </strong>
            </div>
            <div className="summary-row">
              <span>Reuse Recommendation</span>
              <strong>{decision}</strong>
            </div>
            <div className="summary-row">
              <span>Last Updated</span>
              <strong>{lastUpdated}</strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}