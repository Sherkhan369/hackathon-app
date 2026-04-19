const express = require("express");
const router = express.Router();

const auth = require("../middleware/authMiddleware");
const {
  updateProfile,
  getProfile
} = require("../controllers/userController");

router.get("/me", auth, getProfile);
router.put("/me", auth, updateProfile);

module.exports = router;