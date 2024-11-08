const express = require("express");
const { creatUser, readUserData } = require("../controllers/users.controller");
const router = express.Router();

router.post("/userData", readUserData);
router.post("/createUser", creatUser);

module.exports = router;
