const express = require("express");
const router = express.Router();
const Users = require("../controllers/users");
const checkauth = require("../middleware/check_auth");
const checkautohr = require("../middleware/check_authorization");

router.post("/", checkauth, checkautohr, Users.createUser);
router.get("/", checkauth, Users.getAllUser);
router.put("/:id", checkauth, checkautohr, Users.updateUser);
router.delete("/:id", checkauth, checkautohr, Users.deleteUser);

module.exports = router;
