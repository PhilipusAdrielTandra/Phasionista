const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Sequelize } = require('sequelize');
const ordersRoutes = require('./ordersRoutes');

const app = express();
app.use(bodyParser.json());
app.use(cors())

const sequelize = new Sequelize('pha_orders', 'admin', '9n49NvuQZjk6KoLdQLdv ', {
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

app.use('/api', ordersRoutes);

app.listen(3012, () => {
  console.log('Server started on port 3012');
});
