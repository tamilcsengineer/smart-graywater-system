import React from "react";
import "./Workflow.css";

function WorkflowView() {

  return (
    <div className="workflow">

      <h2>Graywater Flow Workflow</h2>

      <div className="workflow-container">

        <div className="flow-box">
          🚿 Washing Machine
        </div>

        <div className="flow-line"></div>

        <div className="flow-box">
          💧 Graywater Tank
        </div>

        <div className="flow-line"></div>

        <div className="flow-box">
          🔬 Sensor Analysis
          <br />
          <span>pH • TDS • Turbidity</span>
        </div>

        <div className="flow-line"></div>

        <div className="flow-box">
          🌱 Reuse System
          <br />
          <span>Toilet / Garden</span>
        </div>

      </div>

    </div>
  );
}

export default WorkflowView;