const Sequelize = require('sequelize');
const sequelize = new Sequelize('pha_users', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
  });

const initModels = require('./userModels/init-models')(sequelize); 
const { users_detail } = initModels;

const { v4: uuidv4 } = require('uuid');
const argon = require('argon2');
const jwt = require('jsonwebtoken')

exports.getAllUsers = async (req, res) => {
  try {
    console.log(users_detail);
    const users = await users_detail.findAll();
    res.json(users); 
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getUserById = async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await User.findByPk(userId); 
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await users_detail.findOne({ where: { email: email } });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    const validPassword = await argon.verify(user.hash, password);
    if (!validPassword) {
      return res.status(401).json({ message: 'Incorrect password' });
    }
    const access_token = jwt.sign({ id: user.id }, 'mariahcarey', { expiresIn: '1h' });
    res.json({ access_token });
  }

  catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.createUser = async (req, res) => {
  const userData = req.body[0];
  const { firstName, lastName, email, hash, about, club_level, region, city, points } = userData; 

  let id = uuidv4(); 
  let userExists = true;
  while (userExists) {
    const existingUser = await users_detail.findOne({ where: { id } });
    if (!existingUser) {
      userExists = false;
    } else {
      id = uuidv4();
    }
  }

  try {
    const user = await users_detail.create({
      id,
      firstName,
      lastName,
      email,
      hash: await argon.hash(hash),
      about,
      club_level,
      region,
      city,
      points,
    });

    const access_token = jwt.sign({ id: id }, 'mariahcarey', { expiresIn: '1h' });
    res.json({ access_token });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};


exports.updateUser = async (req, res) => {
  const userId = req.params.id;
  const { firstName, lastName, email, password, about, clubLevel, region, city, points } = req.body;
  try {
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
   
    user.firstName = firstName;
    user.lastName = lastName;
    user.email = email;
    user.hash = password ? password : user.hash; // Only update the password if a new one was provided
    user.about = about;
    user.club_level = clubLevel;
    user.region = region;
    user.city = city;
    user.points = points;
    await user.save();
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.deleteUser = async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    await user.destroy(); 
    res.status(204).send(); 

    } catch (err) {
console.error(err);
res.status(500).json({ message: 'Server error' });
}
};
