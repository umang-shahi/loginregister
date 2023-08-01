const express = require("express");

const  register = require("../controller/rcontroller");
const login = require("../controller/lcontroller");

const router = express.Router();

// register
router.post("/register",register);

//login
router.post("/login",login);

module.exports = router;
