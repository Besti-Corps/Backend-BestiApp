const express = require("express");
const router = express.Router();

const userHandler = require("./handler/users");
const verifyToken = require("../middlewares/verifyToken");

router.post("/register", userHandler.register);
router.post("/login", userHandler.login);
router.post("/logout", verifyToken, userHandler.logout);
router.put("/update", verifyToken, userHandler.update);
router.get("/get_info", verifyToken, userHandler.getInfoUser);
router.get("/", userHandler.getAllUser);

module.exports = router;
