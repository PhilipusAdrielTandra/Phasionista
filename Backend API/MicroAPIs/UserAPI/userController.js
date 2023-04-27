const Sequelize = require('sequelize');
const sequelize = new Sequelize('pha_users', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
  });

const initModels = require('./userModels/init-models')(sequelize); // Import the user model
const { users_detail } = initModels;

// Controller function for getting all users
exports.getAllUsers = async (req, res) => {
  try {
    console.log(users_detail);
    const users = await users_detail.findAll(); // Query the database for all users
    res.json(users); // Return the users as JSON
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Controller function for getting a user by ID
exports.getUserById = async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await User.findByPk(userId); // Query the database for the user by ID
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user); // Return the user as JSON
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Controller function for creating a new user
exports.createUser = async (req, res) => {
  const { firstName, lastName, email, password, about, clubLevel, region, city, points } = req.body;
  try {
    const user = await User.create({
      firstName,
      lastName,
      email,
      hash: password, // Hash the password before storing it in the database
      about,
      club_level: clubLevel, // Use underscores for column names with multiple words
      last_login: new Date(),
      region,
      city,
      points,
    });
    res.status(201).json(user); // Return the new user as JSON with a 201 status code
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Controller function for updating a user by ID
exports.updateUser = async (req, res) => {
  const userId = req.params.id;
  const { firstName, lastName, email, password, about, clubLevel, region, city, points } = req.body;
  try {
    const user = await User.findByPk(userId); // Query the database for the user by ID
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    // Update the user's properties and save to the database
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
    res.json(user); // Return the updated user as JSON
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Controller function for deleting a user by ID
exports.deleteUser = async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await User.findByPk(userId); // Query the database for the user by ID
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    await user.destroy(); // Delete the user from the database
    res.status(204).send(); // Return a 204 status code

    } catch (err) {
console.error(err);
res.status(500).json({ message: 'Server error' });
}
};
