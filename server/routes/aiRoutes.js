const express = require("express");
const router = express.Router();
const { generateResources } = require("../controllers/aiController");

router.post("/generate", generateResources);

module.exports = router;
