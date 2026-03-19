import React, { useEffect, useState } from "react";

function FlowSimulation({ source }) {

  const [stage, setStage] = useState(0);

  useEffect(() => {

    setStage(1);

    const t1 = setTimeout(() => setStage(2), 1500);
    const t2 = setTimeout(() => setStage(3), 3000);
    const t3 = setTimeout(() => setStage(4), 4500);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };

  }, [source]);

  const box = {
    padding: "15px",
    margin: "20px auto",
    width: "220px",
    border: "2px solid #333",
    borderRadius: "10px",
    background: "#f4f4f4",
    fontWeight: "bold"
  };

  return (

    <div style={{marginTop:"40px"}}>

      <h2>Water Flow Simulation</h2>

      {stage >= 1 && <div style={box}>{source}</div>}

      {stage >= 2 && <div style={box}>Graywater Storage Tank</div>}

      {stage >= 3 && <div style={box}>Water Quality Sensors</div>}

      {stage >= 4 && <div style={box}>Reuse Decision Engine</div>}

    </div>

  );
}

export default FlowSimulation;