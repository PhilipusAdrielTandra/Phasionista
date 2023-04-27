const Sequelize = require('sequelize');
const sequelize = new Sequelize('pha_product', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
  });

const initModels = require('./productModels/init-models')(sequelize); // Import the user model
const { product_details } = initModels;
const Product = product_details;

// CREATE a new product
exports.createProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// READ all products
exports.getProducts = async (req, res) => {
  try {
    const products = await Product.findAll();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// READ a specific product by ID
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (product) {
      res.header('Access-Control-Allow-Origin', '*');
      res.json(product);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE a product by ID
exports.updateProduct = async (req, res) => {
  try {
    const [updatedCount, updatedRows] = await Product.update(req.body, {
      where: { id: req.params.id }
    });
    if (updatedCount > 0) {
      res.json(await Product.findByPk(req.params.id));
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// DELETE a product by ID
exports.deleteProduct = async (req, res) => {
  try {
    const deletedCount = await Product.destroy({
      where: { id: req.params.id }
    });
    if (deletedCount > 0) {
      res.json({ message: 'Product deleted' });
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
