const express = require("express");
const router = express.Router();

const auth = require("../middleware/authMiddleware");
const {
  createRequest,
  getRequests,
  markSolved,
  getStats,
  getSingleRequest
} = require("../controllers/requestController");

router.post("/", auth, createRequest);
router.get("/", auth, getRequests);
router.put("/:id/solve", auth, markSolved);
router.get("/stats", auth, getStats);
router.get("/:id", auth, getSingleRequest);

module.exports = router;