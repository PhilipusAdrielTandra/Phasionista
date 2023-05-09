const express = require('express');
const bodyParser = require('body-parser');
const Sequelize = require('sequelize');
const routes = require('./userRoutes');

// Create an Express.js app
const app = express();

// Parse request bodies as JSON
app.use(bodyParser.json());

// Connect to the MySQL database using Sequelize
const sequelize = new Sequelize('pha_users', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
});

// Test the database connection
sequelize.authenticate()
  .then(() => console.log('Database connection successful'))
  .catch((err) => console.error('Database connection error:', err));

// Define the port for the app to listen on
const port = process.env.PORT || 3001;

// Mount the routes on the /api path
app.use('/user', routes);

// Start the server listening on the specified port
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
