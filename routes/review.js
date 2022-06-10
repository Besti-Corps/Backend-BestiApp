const express = require("express");
const router = express.Router();

const userReview = require("./handler/review");
const verifyToken = require("../middlewares/verifyToken");

router.post("/", verifyToken, userReview.sendComment);
router.get("/", verifyToken, userReview.getComment);

module.exports = router;
