const express = require('express');

const router = express.Router();

const orderController = require('../controllers/purchase');
const authenticateController = require('../middleware/auth');

router.get('/premiummembership', authenticateController.authenticate , orderController.premium);

router.post('/updatetransactionstatus', authenticateController.authenticate, orderController.updateTrans);

module.exports = router;