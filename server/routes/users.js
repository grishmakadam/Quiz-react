const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const {
  userVerification,
  clearCookie,
} = require("../utils/createAndVerifyToken");
router.post("/signup", userController.signup);
router.post("/", userVerification, (req, res) => {
  return res.json({ name: req.name, email: req.email });
});

router.get("/logout", clearCookie);
module.exports = router;
