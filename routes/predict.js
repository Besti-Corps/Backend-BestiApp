const express = require("express");
const multer = require("multer");
const router = express.Router();

const upload = multer({
   memory: multer.memoryStorage,
});

const predictModel = require("./handler/machineLearning");

router.post("/", upload.single("image"), predictModel.imagePredict);

module.exports = router;
