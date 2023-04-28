const Sequelize = require('sequelize');
const sequelize = new Sequelize('pha_cart', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
});

const initModels = require('./cartModels/init-models')(sequelize);
const { user_cart } = initModels;

// Function for adding a product to the cart
exports.addToCart = async (req, res) => {
  try {
    const { productId } = req.body;

    // Check if the product already exists in the cart
    const existingCartItem = await user_cart.findOne({
      where: { product_id: productId }
    });

    if (existingCartItem) {
      // If the product exists in the cart, just update the quantity
      existingCartItem.quantity += 1;
      await existingCartItem.save();
      res.status(200).send({ message: 'Cart item quantity updated successfully.' });
    } else {
      // If the product doesn't exist in the cart yet, create a new cart item
      await user_cart.create({ product_id: productId, quantity: 1 });
      res.status(200).send({ message: 'Product added to cart successfully.' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'Error adding product to cart.' });
  }
};

// Function for getting all cart items
exports.getCart = async (req, res) => {
  try {
    const cartItems = await user_cart.findAll();
    res.status(200).send(cartItems);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'Error getting cart.' });
  }
};

// Function for updating a cart item
exports.updateCartItem = async (req, res) => {
  try {
    const { id } = req.params;
    const { quantity } = req.body;

    // Find the cart item by ID
    const cartItem = await user_cart.findByPk(id);

    if (!cartItem) {
      res.status(404).send({ error: 'Cart item not found.' });
    } else {
      // Update the quantity and save the changes
      cartItem.quantity = quantity;
      await cartItem.save();
      res.status(200).send({ message: 'Cart item updated successfully.' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'Error updating cart item.' });
  }
};

// Function for deleting a cart item
exports.deleteCartItem = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the cart item by ID
    const cartItem = await user_cart.findByPk(id);

    if (!cartItem) {
      res.status(404).send({ error: 'Cart item not found.' });
    } else {
      // Delete the cart item
      await cartItem.destroy();
      res.status(200).send({ message: 'Cart item deleted successfully.' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'Error deleting cart item.' });
  }
};
