const Sequelize = require('sequelize');
const { v4: uuidv4 } = require('uuid');
const sequelize = new Sequelize('pha_product', 'admin', '9n49NvuQZjk6KoLdQLdv', {
  dialect: 'mysql',
  host: 'phasionista-products.ctjeibahvnce.ap-southeast-1.rds.amazonaws.com'
});

const initModels = require('./productModels/init-models')(sequelize); 
const { product_details, product_images, product_inventory, ge_product_category } = initModels;
const Product = product_details;

exports.createProduct = async (req, res) => {
  try {
    const product = await Product.create({ ...req.body, id: uuidv4() });
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getProducts = async (req, res) => {
  try {
    const products = await Product.findAll({
      include: [
        {
          model: product_images,
          as: "image",
        },
      ],
    });

    const modifiedProducts = products.map((product) => {
      const categories = product.category.split(", ");
      const images = product.image.map((image) => image.image);
      return {
        ...product.toJSON(),
        category: categories,
        image: images,
      };
    });

    res.json(modifiedProducts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


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

exports.updateProduct = async (req, res) => {
  try {
    const [updatedCount, updatedRows] = await Product.update(req.body, {
      where: { id: req.params.id },
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


exports.getCategories = async (req, res) => {
  try {
    const categories = await ge_product_category.findAll();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

exports.addCategory = async (req, res) => {
  try {
    const category = await ge_product_category.create({ ...req.body, id: uuidv4() });
    res.status(201).json(category);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateCategory = async (req, res) => {
  try {
    const [updatedCount, updatedRows] = await ge_product_category.update(req.body, {
      where: { id: req.params.id },
    });
    if (updatedCount > 0) {
      res.json(await ge_product_category.findByPk(req.params.id));
    } else {
      res.status(404).json({ message: 'Category not found' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getCategoryById = async (req, res) => {
  try {
    const category = await ge_product_category.findByPk(req.params.id);
    if (category) {
      res.json(category);
    } else {
      res.status(404).json({ message: 'Category not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

exports.deleteCategory = async (req, res) => {
  try {
    const deletedCount = await ge_product_category.destroy({
      where: { id: req.params.id }
    });
    if (deletedCount > 0) {
      res.json({ message: 'Category deleted' });
    } else {
      res.status(404).json({ message: 'Category not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

exports.getProductImages = async (req, res) => {
  try {
    const images = await product_images.findAll();
    res.json(images);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

exports.addProductImage = async (req, res) => {
  try {
    const { id } = req.params;
    const image = await product_images.create({ image: req.body.image, id: uuidv4(), product_id: id });
    res.status(201).json(image);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteProductImage = async (req, res) => {
  try {
    const deletedCount = await product_images.destroy({
      where: { id: req.params.id }
    });
    if (deletedCount > 0) {
      res.json({ message: 'Image deleted' });
    } else {
      res.status(404).json({ message: 'Image not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

exports.getInventory = async (req, res) => {
  try {
    const inventory = await product_inventory.findAll();
    res.json(inventory);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

exports.addInventory = async (req, res) => {
  try {
    const inventory = await product_inventory.create({ ...req.body, id: uuidv4() });
    res.status(201).json(inventory);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateInventory = async (req, res) => {
  try {
    const [updatedCount, updatedRows] = await product_inventory.update(req.body, {
      where: { id: req.params.id },
    });
    if (updatedCount > 0) {
      res.json(await product_inventory.findByPk(req.params.id));
    } else {
      res.status(404).json({ message: 'Inventory not found' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getInventoryById = async (req, res) => {
  try {
    const inventory = await product_inventory.findByPk(req.params.id);
    if (inventory) {
      res.json(inventory);
    } else {
      res.status(404).json({ message: 'Inventory not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

exports.deleteInventory = async (req, res) => {
  try {
    const deletedCount = await product_inventory.destroy({
      where: { id: req.params.id }
    });
    if (deletedCount > 0) {
      res.json({ message: 'Inventory deleted' });
    } else {
      res.status(404).json({ message: 'Inventory not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

exports.getInventoryByProductId = async (req, res) => {
  try {
    const inventory = await product_inventory.findAll({
      where: { product_id: req.params.id }
    });
    if (inventory) {
      res.json(inventory);
    } else {
      res.status(404).json({ message: 'Inventory not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

exports.getRetailerProducts = async (req, res) => {
  try {
    const products = await product_details.findAll({
      where: { retailer_id: req.params.rid }
    });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
