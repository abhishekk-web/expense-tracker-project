const express = require('express');

const router = express.Router();
const expenseController = require('../controllers/expense');
const authenticateController = require('../middleware/auth');


router.post("/postexpense", authenticateController.authenticate ,expenseController.postexpense);

router.get("/getexpense", authenticateController.authenticate , expenseController.getexpense);

router.delete("/deleteexpense/:id", authenticateController.authenticate, expenseController.detetePost);

module.exports = router;