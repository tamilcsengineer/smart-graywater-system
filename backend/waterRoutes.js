const express = require("express");
const analyzeWater = require("../logic/decisionEngine");

const router = express.Router();

router.post("/analyze", (req, res) => {

    const { source } = req.body;

    const result = analyzeWater(source);

    res.json(result);

});

module.exports = router;