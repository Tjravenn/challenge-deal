const express = require("express");
const router = express.Router();
const users = require("./users");
const auths = require("./auth");

router.use("/users", users);
router.use("/auth", auths);


module.exports = router;
