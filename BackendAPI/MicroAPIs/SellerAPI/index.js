const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Sequelize } = require('sequelize');
const sellerRoutes = require('./sellerRoutes');

const app = express();
app.use(bodyParser.json());
app.use(cors())

const sequelize = new Sequelize('pha_seller', 'admin', '9n49NvuQZjk6KoLdQLdv', {
  dialect: 'mysql',
  host: 'phasionista-seller.ctjeibahvnce.ap-southeast-1.rds.amazonaws.com'
});

(async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})();

app.use('/seller', sellerRoutes);

app.listen(3015, () => {
  console.log('Server started on port 3015');
});
