const express = require('express');

const authenticateController = require('../middleware/auth');
const premiumController = require('../controllers/premium');

const router = express.Router();

router.get("/showleaderboard", authenticateController.authenticate, premiumController.leaderBoard)

module.exports = router;