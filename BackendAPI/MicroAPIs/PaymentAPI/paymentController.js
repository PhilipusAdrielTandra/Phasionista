const Sequelize = require('sequelize');
const sequelize = new Sequelize('pha_payment', 'admin', '9n49NvuQZjk6KoLdQLdv', {
    host: 'localhost',
    dialect: 'mysql',
  });

const initModels = require('./paymentModels/init-models')(sequelize); 
const { payment_methods } = initModels;
const PaymentMethod = payment_methods;

exports.createPaymentMethod = (req, res) => {
  PaymentMethod.create({
    user_id: req.body.user_id,
    card_type: req.body.card_type,
    card_number: req.body.card_number,
    expiry_date: req.body.expiry_date
  })
  .then(paymentMethod => {
    res.status(201).json(paymentMethod);
  })
  .catch(err => {
    console.error(err);
    res.status(500).json({ message: 'An error occurred while creating the payment method.' });
  });
};

exports.getPaymentMethodById = (req, res) => {
  PaymentMethod.findByPk(req.params.id)
  .then(paymentMethod => {
    if (!paymentMethod) {
      res.status(404).json({ message: 'Payment method not found.' });
    } else {
      res.status(200).json(paymentMethod);
    }
  })
  .catch(err => {
    console.error(err);
    res.status(500).json({ message: 'An error occurred while retrieving the payment method.' });
  });
};

exports.updatePaymentMethodById = (req, res) => {
  PaymentMethod.findByPk(req.params.id)
  .then(paymentMethod => {
    if (!paymentMethod) {
      res.status(404).json({ message: 'Payment method not found.' });
    } else {
      paymentMethod.update({
        user_id: req.body.user_id,
        card_type: req.body.card_type,
        card_number: req.body.card_number,
        expiry_date: req.body.expiry_date
      })
      .then(updatedPaymentMethod => {
        res.status(200).json(updatedPaymentMethod);
      })
      .catch(err => {
        console.error(err);
        res.status(500).json({ message: 'An error occurred while updating the payment method.' });
      });
    }
  })
  .catch(err => {
    console.error(err);
    res.status(500).json({ message: 'An error occurred while retrieving the payment method.' });
  });
};

exports.deletePaymentMethodById = (req, res) => {
  PaymentMethod.destroy({
    where: {
      id: req.params.id
    }
  })
  .then(numDeleted => {
    if (numDeleted === 1) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: 'Payment method not found.' });
    }
  })
  .catch(err => {
    console.error(err);
    res.status(500).json({ message: 'An error occurred while deleting the payment method.' });
  });
};
