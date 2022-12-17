const express = require("express");
const router = express.Router();
const Auth = require("../controllers/auth");

router.post("/login", Auth.userLogin);

module.exports = router;