const Sequelize = require('sequelize');
const sequelize = new Sequelize('pha_seller', 'admin', '9n49NvuQZjk6KoLdQLdv', {
    host: 'localhost',
    dialect: 'mysql',
  });

const initModels = require('./sellerModels/init-models')(sequelize);
const { retailer_details } = initModels;

const createSeller = async (req, res) => {
  try {
    const seller = await retailer_details.create(req.body);
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