const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Sequelize } = require('sequelize');
const cartRoutes = require('./cartRoutes');

const app = express();
app.use(bodyParser.json());
app.use(cors())

const cookieParser = require('cookie-parser');
const session = require('express-session');
const RedisStore = require('connect-redis').default;
const redis = require('redis');

let redisClient = redis.createClient({
  host: 'localhost',
  port: 6379,
  password: ''
})

redisClient.connect().catch(console.error)

redisClient.on('error', function (err) {
  console.log('Could not establish a connection with redis. ' + err);
});
redisClient.on('connect', function (err) {
  console.log('Connected to redis successfully');
});

let redisStore = new RedisStore({
  client: redisClient,
  prefix: 'pha:',
  ttl: 86400
})

app.use(cookieParser());
app.use(
  session({
    store: redisStore,
    resave: false, // required: force lightweight session keep alive (touch)
    saveUninitialized: true, // recommended: only save session when data exists
    secret: 'mariahcarey',
    cookie: { 
      httpOnly: false,
      secure: false,
      maxAge: 86400000 
  }
  })  
)

const sequelize = new Sequelize('pha_cart', 'admin', '9n49NvuQZjk6KoLdQLdv ', {
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

app.use('/cart', cartRoutes);

app.listen(3010, () => {
  console.log('Server started on port 3010');
});
