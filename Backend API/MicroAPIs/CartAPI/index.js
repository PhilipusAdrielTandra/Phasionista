const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Sequelize } = require('sequelize');
const cartRoutes = require('./cartRoutes');

const app = express();
app.use(bodyParser.json());
app.use(cors())

const sequelize = new Sequelize('pha_cart', 'root', '', {
  dialect: 'mysql',
  host: 'localhost'
});

(async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})();

app.use('/api', cartRoutes);

app.listen(3000, () => {
  console.log('Server started on port 3000');
});
