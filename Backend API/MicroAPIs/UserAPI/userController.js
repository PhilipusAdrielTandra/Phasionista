const Sequelize = require('sequelize');
const sequelize = new Sequelize('pha_users', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
  });

const initModels = require('./userModels/init-models')(sequelize); 
const { users_detail } = initModels;

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

exports.createUser = async (req, res) => {
  const { firstName, lastName, email, password, about, clubLevel, region, city, points } = req.body;
  try {
    const user = await User.create({
      firstName,
      lastName,
      email,
      hash: password, // hash the password, will do later!
      about,
      club_level: clubLevel,
      last_login: new Date(),
      region,
      city,
      points,
    });
    res.status(201).json(user);
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
