const Sequelize = require('sequelize');
const sequelize = new Sequelize('pha_cart', 'admin', '9n49NvuQZjk6KoLdQLdv', {
  host: 'phasionista-cart.ctjeibahvnce.ap-southeast-1.rds.amazonaws.com',
  dialect: 'mysql',
});

const initModels = require('./cartModels/init-models')(sequelize);
const { user_cart } = initModels;

const { v4: uuidv4 } = require('uuid');
const argon = require('argon2');
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser');

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
  const bearer = token ? token.split(" ")[1] : undefined;
  const decoded = jwt.decode(bearer);
  const userId = decoded ? decoded.id : null;
  const signedCookie = req.cookies['connect.sid'];
  const sessionId = cookieParser.signedCookie(signedCookie, 'mariahcarey');

  let id = uuidv4();
  if (!userId) {
    id = sessionId;
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
    
      if (!Array.isArray(cartItems)) {
        cartItems = [];
      }
    
      const existingCartItemIndex = cartItems.findIndex(item => item.product_id === productId);
      if (existingCartItemIndex !== -1) {
        const updatedQuantity = cartItems[existingCartItemIndex].quantity + Number(amount);
        cartItems[existingCartItemIndex].quantity = updatedQuantity;
        res.status(200).send({ message: 'Cart item quantity updated to session successfully.' });
      } else {
        const newCartItem = { sessionId: sessionId, product_id: productId, quantity: Number(amount) };
        cartItems.push(newCartItem);
        res.status(200).send({ message: 'Product added to session cart successfully.' });
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
  const bearer = token ? token.split(" ")[1] : undefined;
  const decoded = jwt.decode(bearer);
  const userId = decoded ? decoded.id : null;
  const signedCookie = req.cookies['connect.sid'];
  const sessionId = cookieParser.signedCookie(signedCookie, 'mariahcarey');

  try {
    let cartItems = [];

    if (userId) {
      // If there is a userId, get the cart items for that user
      cartItems = await user_cart.findAll({ where: { user_id: userId } });

      // Check if there is a sessionId
      if (sessionId) {
        const sessionCartItems = await redisClient.get(sessionId);

        // If there are session cart items, merge them with the user's cart items
        if (sessionCartItems) {
          const sessionCartItemsParsed = JSON.parse(sessionCartItems);

          for (const sessionCartItem of sessionCartItemsParsed) {
            const existingCartItem = await user_cart.findOne({
              where: { product_id: sessionCartItem.product_id, user_id: userId }
            });

            if (existingCartItem) {
              const updatedQuantity = existingCartItem.quantity + sessionCartItem.quantity;
              await existingCartItem.update({ quantity: updatedQuantity });
            } else {
              await user_cart.create({
                id: sessionCartItem.sessionId,
                user_id: userId,
                product_id: sessionCartItem.product_id,
                quantity: sessionCartItem.quantity
              });
            }
          }

          // Delete the session cart items after merging them
          await redisClient.del(sessionId);
        }
      }
    } else if (sessionId) {
      // If there is no userId, but there is a sessionId, get the cart items for the sessionId
      const sessionCartItems = await redisClient.get(sessionId);

      if (sessionCartItems) {
        cartItems = JSON.parse(sessionCartItems);
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
  const sessionId = req.headers['session-id'];
  const { productId, quantity } = req.body;

  try {
    let cartItem;
    if (userId) {
      cartItem = await user_cart.findOne({
        where: { product_id: productId, user_id: userId }
      });
    } else {
      const cartItemsJson = await redisClient.get(sessionId);
      const cartItems = cartItemsJson ? JSON.parse(cartItemsJson) : [];
      cartItem = cartItems.find(item => item.product_id === productId);
    }

    if (!cartItem) {
      res.status(404).send({ error: 'Cart item not found.' });
    } else {
      cartItem.quantity = quantity;
      if (userId) {
        await cartItem.save();
        res.status(200).send({ message: 'Cart item updated successfully.' });
      } else {
        await redisClient.set(sessionId, JSON.stringify(cartItems));
        res.status(200).send({ message: 'Cart item updated to session successfully.' });
      }
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
      const cartItemsJson = await redisClient.get(sessionId);
      const cartItems = cartItemsJson ? JSON.parse(cartItemsJson) : [];
      cartItem = cartItems.find(item => item.id === id);
    }

    if (!cartItem) {
      res.status(404).send({ error: 'Cart item not found.' });
    } else {
      if (userId) {
        await cartItem.destroy();
      } else {
        const updatedCartItems = cartItems.filter(item => item.id !== id);
        await redisClient.set(sessionId, JSON.stringify(updatedCartItems));
      }
      res.status(200).send({ message: 'Cart item deleted successfully.' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'Error deleting cart item.' });
  }
};
