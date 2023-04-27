const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Sequelize } = require('sequelize');
const productRoutes = require('./productRoutes');

const app = express();
app.use(bodyParser.json());
app.use(cors())

// Initialize Sequelize
const sequelize = new Sequelize('pha_product', 'root', '', {
  dialect: 'mysql',
  host: 'localhost'
});

// Test the database connection
(async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})();

// Mount the product routes
app.use('/products', productRoutes);

// Start the server
app.listen(3000, () => {
  console.log('Server started on port 3000');
});
