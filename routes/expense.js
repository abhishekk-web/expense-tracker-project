const express = require('express');

const router = express.Router();
const expenseController = require('../controllers/expense');

router.post("/postexpense",expenseController.postexpense);

router.get("/getexpense", expenseController.getexpense);

router.delete("/deleteexpense/:id", expenseController.detetePost);

module.exports = router;