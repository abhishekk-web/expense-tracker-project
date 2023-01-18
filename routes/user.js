const express= require('express');

const router = express.Router();

const signupController = require('../controllers/user');

router.post("/signup", signupController.signUp);

router.post("/login", signupController.login);



module.exports = router;