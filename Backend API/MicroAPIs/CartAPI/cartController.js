const Sequelize = require('sequelize');
const sequelize = new Sequelize('pha_cart', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
});

const initModels = require('./cartModels/init-models')(sequelize);
const { user_cart } = initModels;

const { v4: uuidv4 } = require('uuid');
const argon = require('argon2');
const jwt = require('jsonwebtoken')

exports.addToCart = async (req, res) => {
  const token = req.headers['authorization'];
  const decoded = jwt.decode(token);
  const userId = decoded.id;

  let id = uuidv4(); 
  let idExists = true;
  while (idExists) {
    const existingId = await user_cart.findOne({ where: { id } });
    if (!existingId) {
      idExists = false;
    } else {
      id = uuidv4();
    }
  }

  try {
    const { productId, amount } = req.body;

    const existingCartItem = await user_cart.findOne({
      where: { product_id: productId, user_id: userId }
    });

    if (existingCartItem) {
      const updatedQuantity = existingCartItem.quantity + Number(amount);
      await existingCartItem.update({ quantity: updatedQuantity });
      res.status(200).send({ message: 'Cart item quantity updated successfully.' });
    } else {
      await user_cart.create({ id, user_id: userId, product_id: productId, quantity: Number(amount) });
      res.status(200).send({ message: 'Product added to cart successfully.' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'Error adding product to cart.' });
  }
};

exports.getCart = async (req, res) => {
  const token = req.headers['authorization'];
  const decoded = jwt.decode(token);
  const userId = decoded.id;

  try {
    const cartItems = await user_cart.findAll({ where: { user_id: userId }});
    res.status(200).send(cartItems);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'Error getting cart.' });
  }
};

exports.updateCartItem = async (req, res) => {
  const token = req.headers['authorization'];
  const decoded = jwt.decode(token);
  const userId = decoded.id;

  try {
    const { productId, quantity } = req.body;

    const cartItem = await user_cart.findByPk(id);

    if (!cartItem) {
      res.status(404).send({ error: 'Cart item not found.' });
    } else {
      cartItem.quantity = quantity;
      await cartItem.save();
      res.status(200).send({ message: 'Cart item updated successfully.' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'Error updating cart item.' });
  }
};

exports.deleteCartItem = async (req, res) => {
  const token = req.headers['authorization'];
  const decoded = jwt.decode(token);
  const userId = decoded.id;

  try {
    const { id } = req.params;

    const cartItem = await user_cart.findByPk(id);

    if (!cartItem) {
      res.status(404).send({ error: 'Cart item not found.' });
    } else {
      await cartItem.destroy();
      res.status(200).send({ message: 'Cart item deleted successfully.' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'Error deleting cart item.' });
  }
};
