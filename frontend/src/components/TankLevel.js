import React, { useState, useEffect } from "react";
import "./TankLevel.css";

export default function TankLevel() {

  const [tank1, setTank1] = useState(60);
  const [tank2, setTank2] = useState(20);
  const [flow, setFlow] = useState(false);

  const [sensor, setSensor] = useState({
    ph: 7,
    tds: 100,
    turbidity: 10,
  });

  const [decision, setDecision] = useState("Waiting...");

  const toggleFlow = () => setFlow(!flow);

  useEffect(() => {
    if (!flow) return;

    const interval = setInterval(() => {

      setTank1((prev) => (prev >= 100 ? 100 : prev + 2));

      setTank1((prev) => {
        if (prev > 10) {
          setTank2((t2) => (t2 >= 100 ? 100 : t2 + 1));
          return prev - 1;
        }
        return prev;
      });

      const ph = (Math.random() * 2 + 6).toFixed(2);
      const tds = Math.floor(Math.random() * 500);
      const turbidity = Math.floor(Math.random() * 60);

      setSensor({ ph, tds, turbidity });

      if (turbidity < 20 && tds < 300) {
        setDecision("Reuse for Washing");
      } else if (turbidity < 40) {
        setDecision("Toilet Flushing");
      } else if (turbidity < 60) {
        setDecision("Gardening");
      } else {
        setDecision("Drain Water");
      }

    }, 1000);

    return () => clearInterval(interval);
  }, [flow]);

  return (
    <div className="tank-container">

      <h1>Smart Water Flow System</h1>

      <div className="workflow">

        <div className="box">Source</div>

        <div className="pipe"><div className={flow ? "flow active" : "flow"}></div></div>

        <div className={`pump ${flow ? "on" : ""}`}>⚙️</div>

        <div className="pipe"><div className={flow ? "flow active" : "flow"}></div></div>

        {/* TANK 1 */}
        <div className="tank">
          <div className="water" style={{ height: `${tank1}%` }}></div>
          <span>{tank1}%</span>
        </div>

        {/* PIPE → USED WATER */}
        <div className="pipe"><div className={flow ? "flow active" : "flow"}></div></div>

        {/* USED WATER */}
        <div className="used-water">
          <h4>Used Water</h4>
          <div className={flow ? "used-flow active" : "used-flow"}></div>
        </div>

        {/* PIPE → TANK 2 */}
        <div className="pipe"><div className={flow ? "flow active" : "flow"}></div></div>

        {/* TANK 2 */}
        <div className="tank second">
          <div className="water" style={{ height: `${tank2}%` }}></div>
          <span>{tank2}%</span>
        </div>

        {/* PIPE → SENSOR */}
        <div className="pipe"><div className={flow ? "flow active" : "flow"}></div></div>

        {/* SENSOR */}
        <div className="sensor-box">
          <h4>Sensor</h4>
          <p>pH: {sensor.ph}</p>
          <p>TDS: {sensor.tds}</p>
          <p>Turbidity: {sensor.turbidity}</p>
        </div>

        {/* RESULT */}
        <div className="result-box">
          <h4>Decision</h4>
          <p>{decision}</p>
        </div>

      </div>

      <div className="controls">
        <button onClick={toggleFlow}>
          {flow ? "Stop Flow" : "Start Flow"}
        </button>
      </div>

    </div>
  );
}