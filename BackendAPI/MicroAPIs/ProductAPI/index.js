const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Sequelize } = require('sequelize');
const productRoutes = require('./productRoutes');

const app = express();
app.use(bodyParser.json());
app.use(cors())

const sequelize = new Sequelize('pha_product', 'admin', 'password', {
  dialect: 'mysql',
  host: 'phasionista-products.ctjeibahvnce.ap-southeast-1.rds.amazonaws.com'
});

(async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})();

app.use('/product', productRoutes);

app.listen(3014, () => {
  console.log('Server started on port 3014');
});
