const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Sequelize } = require('sequelize');
const chatRoutes = require('./chatRoutes');

const app = express();
app.use(bodyParser.json());
app.use(cors())

const sequelize = new Sequelize('pha_chat', 'root', '', {
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

app.use('/api', chatRoutes);

app.listen(3002, () => {
  console.log('Server started on port 3000');
});
