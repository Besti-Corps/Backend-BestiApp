const express = require("express");
const router = express.Router();

const refreshTokenHandler = require("./handler/refreshTokens");

router.post("/", refreshTokenHandler.create);

module.exports = router;
