import React from "react";
import WorkflowView from "./WorkflowView";
import SimulationPanel from "./SimulationPanel";
import AnalyticsDashboard from "./AnalyticsDashboard";
import "./Dashboard.css";

function DashboardLayout(){

const container = {
background:"#0f172a",
minHeight:"100vh",
color:"white",
padding:"30px"
}

const grid = {
display:"grid",
gridTemplateColumns:"1fr 1fr",
gap:"30px",
marginTop:"40px"
}

const card = {
background:"#1e293b",
padding:"20px",
borderRadius:"12px",
boxShadow:"0px 4px 15px rgba(0,0,0,0.4)"
}

return(

<div style={container}>

<h1 style={{textAlign:"center"}}>
Smart Graywater Recycling Dashboard
</h1>

<p style={{textAlign:"center", opacity:0.7}}>
Real-Time Water Management Simulation
</p>

<div style={card}>
<WorkflowView/>
</div>

<div style={grid}>

<div style={card}>
<SimulationPanel/>
</div>

<div style={card}>
<AnalyticsDashboard/>
</div>

</div>

</div>

)

}

export default DashboardLayout;