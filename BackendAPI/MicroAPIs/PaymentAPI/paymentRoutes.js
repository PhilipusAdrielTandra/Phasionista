const express = require('express');
const router = express.Router();
const paymentController = require('./paymentController');

router.post('/payment', paymentController.createPaymentMethod);
router.get('/payment/:id', paymentController.getPaymentMethodById);
router.put('/payment/:id', paymentController.updatePaymentMethodById);
router.delete('/payment/:id', paymentController.deletePaymentMethodById);

module.exports = router;
