const express = require("express");
const router = express.Router();
const { userVerification } = require("../utils/createAndVerifyToken");
const scoreController = require("../controllers/scoreController");

router.post("/add-score", userVerification, scoreController.addScore);
router.get("/show-score/:email", userVerification, scoreController.showScore);
module.exports = router;
