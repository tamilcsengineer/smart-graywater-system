const express = require("express");
const cors = require("cors");
const waterRoutes = require("./routes/waterRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/water", waterRoutes);

app.listen(5000, () => {
    console.log("Server running on port 5000");
});