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

const RedisStore = require('connect-redis').default;
const redis = require('redis');

let redisClient = redis.createClient({
  host: 'localhost',
  port: 6379,
  password: ''
})

redisClient.connect().catch(console.error)

exports.addToCart = async (req, res) => {
  const token = req.headers['authorization'];
  const decoded = jwt.decode(token);
  const userId = decoded ? decoded.id : null;
  const sessionId = req.headers['session-id'] || uuidv4();

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

    if (userId) {
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
    } else {
      const cartItemsJson = await redisClient.get(sessionId);
      let cartItems = cartItemsJson ? JSON.parse(cartItemsJson) : [];

      const existingCartItemIndex = cartItems.findIndex(item => item.product_id === productId);
      if (existingCartItemIndex !== -1) {
        const updatedQuantity = cartItems[existingCartItemIndex].quantity + Number(amount);
        cartItems[existingCartItemIndex].quantity = updatedQuantity;
        res.status(200).send({ message: 'Cart item quantity updated successfully.' });
      } else {
        const newCartItem = { id, sessionId: sessionId, product_id: productId, quantity: Number(amount) };
        cartItems.push(newCartItem);
        res.status(200).send({ message: 'Product added to cart successfully.' });
      }

      await redisClient.set(sessionId, JSON.stringify(cartItems));
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'Error adding product to cart.' });
  }
};


exports.getCart = async (req, res) => {
  const token = req.headers['authorization'];
  const decoded = jwt.decode(token);
  const userId = decoded ? decoded.id : null;
  const sessionId = req.headers['session-id'];

  try {
    let cartItems;
    if (userId) {
      cartItems = await user_cart.findAll({ where: { user_id: userId }});
      if (sessionId) {
        await redisClient.del(sessionId); // remove the session ID from Redis
      }
    } else {
      const cartItemsJson = await redisClient.get(sessionId);
      if (cartItemsJson) {
        cartItems = JSON.parse(cartItemsJson);
      } else {
        cartItems = await user_cart.findAll({ where: { session_id: sessionId }});
      }
    }
    res.status(200).send(cartItems);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'Error getting cart.' });
  }
};

exports.updateCartItem = async (req, res) => {
  const token = req.headers['authorization'];
  const decoded = jwt.decode(token);
  const userId = decoded ? decoded.id : null;
  const sessionId = req.body.session_id;
  const { productId, quantity } = req.body;

  try {
    let cartItem;
    if (userId) {
      cartItem = await user_cart.findOne({
        where: { product_id: productId, user_id: userId }
      });
    } else {
      cartItem = await user_cart.findOne({
        where: { product_id: productId, session_id: sessionId }
      });
    }

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
  const userId = decoded ? decoded.id : null;
  const sessionId = req.headers['session-id'];
  const { id } = req.params;

  try {
    let cartItem;
    if (userId) {
      cartItem = await user_cart.findByPk(id);
    } else {
      cartItem = await user_cart.findOne({
        where: { id, session_id: sessionId }
      });
    }

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
