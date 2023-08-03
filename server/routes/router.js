const express = require("express");

const  register = require("../controller/rcontroller");
const login = require("../controller/lcontroller");
const getAllUsers = require("../controller/getAllUsers");
const auth = require("../middlewares/auth");


const router = express.Router();

//getallusers
router.get('/users',getAllUsers);

// register
router.post("/register",register);

//login
router.post("/login",login);

module.exports = router;
