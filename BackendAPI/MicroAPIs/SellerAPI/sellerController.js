const Sequelize = require('sequelize');
const argon = require('argon2');
const { v4: uuidv4 } = require('uuid');
const jwt = require('jsonwebtoken')
const sequelize = new Sequelize('pha_seller', 'admin', '9n49NvuQZjk6KoLdQLdv', {
    host: 'phasionista-seller.ctjeibahvnce.ap-southeast-1.rds.amazonaws.com',
    dialect: 'mysql',
  });

const initModels = require('./sellerModels/init-models')(sequelize);
const { retailer_details, retailer_images, retailer_location, retailer_products, retailer_ratings } = initModels;

const createSeller = async (req, res) => {
  const token = req.headers['authorization'];
  const bearer = token ? token.split(" ")[1] : undefined;
  const decoded = jwt.decode(bearer);
  const userId = decoded ? decoded.id : null;

  try {
    const existingSeller = await retailer_details.findOne({
      where: {
        user_id: userId
      }
    });

    if (existingSeller) {
      return res.status(400).send('Seller already exists for the user');
    }

    const { retailer_name, description, shop_level, image } = req.body; 
    const sellerId = uuidv4();

    const seller = await retailer_details.create({
      id: sellerId,
      user_id: userId,
      retailer_name,
      description,
      shop_level,
      image
    });

    res.json(seller);
  } catch (error) {
    console.log(error);
    res.status(500).send('Server Error');
  }
};


const getAllSellers = async (req, res) => {
  try {
    const sellers = await retailer_details.findAll();
    res.json(sellers);
  } catch (error) {
    console.log(error);
    res.status(500).send('Server Error');
  }
};

const getSellerById = async (req, res) => {
  try {
    const seller = await retailer_details.findByPk(req.params.id);
    if (!seller) {
      res.status(404).send('Seller not found');
    } else {
      res.json(seller);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send('Server Error');
  }
};

const updateSeller = async (req, res) => {
  try {
    const seller = await retailer_details.findByPk(req.params.id);
    if (!seller) {
      res.status(404).send('Seller not found');
    } else {
      await seller.update(req.body);
      res.json(seller);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send('Server Error');
  }
};

const deleteSeller = async (req, res) => {
  try {
    const seller = await retailer_details.findByPk(req.params.id);
    if (!seller) {
      res.status(404).send('Seller not found');
    } else {
      await seller.destroy();
      res.json('Seller deleted');
    }
  } catch (error) {
    console.log(error);
    res.status(500).send('Server Error');
  }
};

module.exports = {
  createSeller,
  getAllSellers,
  getSellerById,
  updateSeller,
  deleteSeller
};