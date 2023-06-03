const Sequelize = require('sequelize');
const sequelize = new Sequelize('pha_users', 'admin', '9n49NvuQZjk6KoLdQLdv', {
    host: 'phasionista-user.ctjeibahvnce.ap-southeast-1.rds.amazonaws.com',
    dialect: 'mysql',
  });

const initModels = require('./userModels/init-models')(sequelize); 
const { users_detail, user_address, user_wishlist, user_reviews, user_transactions } = initModels;

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
  const token = req.headers['authorization'];
  const bearer = token ? token.split(" ")[1] : undefined;
  const decoded = jwt.decode(bearer);
  const userId = decoded ? decoded.id : null;

  try {
    const user = await users_detail.findByPk(userId,
      { 
        include: [
          {
        model: user_address,
        as: 'user_addresses'
          }
      ]
    }); 
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getToken = async (req, res) => {
  const token = req.headers['authorization'];
  const bearer = token ? token.split(" ")[1] : undefined;
  const decoded = jwt.decode(bearer);
  const userId = decoded ? decoded.id : null;

  try {
    const user = await users_detail.findByPk(decoded.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    const token = jwt.sign({ id: user.id }, 'mariahcarey', {
      expiresIn: '1h'
    });
    res.json({ token });
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
    const refresh_token = jwt.sign({ id: user.id }, 'refresher', { expiresIn: '30d' });
    res.json({ access_token, refresh_token });
  }

  catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.createUser = async (req, res) => {
  const userData = req.body;
  const { fullName, email, phoneNumber, password, about, club_level, points, userAddress } = userData; 
  const { address, city, state, zip_code, country } = userAddress;

  const exisitingEmail = await users_detail.findOne({ where: { email }});
  if (exisitingEmail) {
    return res.status(409).json({ message: 'Email already in use' });
  }

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
      fullName,
      email,
      phoneNumber,
      hash: await argon.hash(password),
      about,
      club_level,
      points
    });

    let addId = uuidv4();
    const addr = await user_address.create({
      id: addId,
      user_id: id,
      address,
      city,
      state,
      zip_code,
      country
    });

    const access_token = jwt.sign({ id: id }, 'mariahcarey', { expiresIn: '1h' });  
    const refresh_token = jwt.sign({ id: id }, 'refresher', { expiresIn: '30d' });
    res.json({ access_token, refresh_token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};


exports.updateUser = async (req, res) => {
  const token = req.headers['authorization'];
  const bearer = token ? token.split(" ")[1] : undefined;
  const decoded = jwt.decode(bearer);
  const userId = decoded ? decoded.id : null;

  const { fullName, email, phoneNumber, password, about, clubLevel, region, city, points } = req.body;
  try {
    const user = await users_detail.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
   
    user.fullName = fullName ? fullName : user.fullName;
    user.email = email ? email : user.email;
    user.phoneNumber = phoneNumber ? phoneNumber: user.phoneNumber;
    user.hash = password ? await argon.hash(password) : user.hash;
    user.about = about ? about : user.about;
    user.club_level = clubLevel ? clubLevel : user.club_level;
    user.region = region ? region : user.region;
    user.city = city ? city : user.city;
    user.points = points ? points : user.points;
    await user.save();;
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.deleteUser = async (req, res) => {
  const token = req.headers['authorization'];
  const bearer = token ? token.split(" ")[1] : undefined;
  const decoded = jwt.decode(bearer);
  const userId = decoded ? decoded.id : null;

  try {
    const user = await users_detail.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    await user.destroy(); 
    return res.status(204).send({ message: 'User deleted'}); 

    } catch (err) {
console.error(err);
res.status(500).json({ message: 'Server error' });
}
};

exports.getUsersWishlist = async (req, res) => {
  const token = req.headers['authorization'];
  const bearer = token ? token.split(" ")[1] : undefined;
  const decoded = jwt.decode(bearer);
  const userId = decoded ? decoded.id : null;

  try {
    const wishlist = await user_wishlist.findAll({
      where: {
        user_id: userId
      }
    });
    if (!wishlist) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(wishlist);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
}

exports.addUserWishlist = async (req, res) => {
  const token = req.headers['authorization'];
  const bearer = token ? token.split(" ")[1] : undefined;
  const decoded = jwt.decode(bearer);
  const userId = decoded ? decoded.id : null;

  const { product_id } = req.body;

  let id = uuidv4(); 
  let idExists = true;
  while (idExists) {
    const existingId = await user_wishlist.findOne({ where: { id } });
    if (!existingId) {
      idExists = false;
    } else {
      id = uuidv4();
    }
  }

  const existingProduct = await user_wishlist.findOne({ where: { product_id }});
  if (existingProduct) {
    return res.status(409).json({ message: 'Product already in wishlist' });
  }

  try {
    const wishlist = await user_wishlist.create({
      id,
      user_id: userId,
      product_id
    });
    res.json(wishlist);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
}

exports.deleteUserWishlist = async (req, res) => {
  const token = req.headers['authorization'];
  const bearer = token ? token.split(" ")[1] : undefined;
  const decoded = jwt.decode(bearer);
  const userId = decoded ? decoded.id : null;
  const { product_id } = req.body;

  try { 
    const wishlist = await user_wishlist.findOne({
      where: {
        user_id: userId,
        product_id
      }
    });
    if (!wishlist) {
      return res.status(404).json({ message: 'Product not found' });
    }
    await wishlist.destroy(); 
    return res.status(204).send({ message: 'Product deleted from wishlist'}); 

    } catch (err){
      console.error(err);
    }

}

exports.getReviewsById = async (req, res) => {
  const { id } = req.params;

  try {
    const reviews = await user_reviews.findAll({
      where: {
        user_id: id
      }
    });
    if (!reviews) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(reviews);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
}

exports.addUserReviews = async (req, res) => {
  const token = req.headers['authorization'];
  const bearer = token ? token.split(" ")[1] : undefined;
  const decoded = jwt.decode(bearer);
  const userId = decoded ? decoded.id : null;

  const { product_id, rating, review } = req.body;

  let id = uuidv4(); 
  let idExists = true;
  while (idExists) {
    const existingId = await user_reviews.findOne({ where: { id } });
    if (!existingId) {
      idExists = false;
    } else {
      id = uuidv4();
    }
  }

  try {
    const reviews = await user_reviews.create({
      id,
      user_id: userId,
      product_id,
      rating,
      review
    });
    res.json(reviews);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
}

exports.deleteUserReviews = async (req, res) => {
  const token = req.headers['authorization'];
  const bearer = token ? token.split(" ")[1] : undefined;
  const decoded = jwt.decode(bearer);
  const userId = decoded ? decoded.id : null;
  const { product_id } = req.body;

  try { 
    const reviews = await user_reviews.findOne({
      where: {
        user_id: userId,
        product_id
      }
    });
    if (!reviews) {
      return res.status(404).json({ message: 'Product not found' });
    }
    await reviews.destroy(); 
    return res.status(204).send({ message: 'Review deleted'}); 

    } catch (err){
      console.error(err);
    }

}

exports.getUserTransactions = async (req, res) => {
  const token = req.headers['authorization'];
  const bearer = token ? token.split(" ")[1] : undefined;
  const decoded = jwt.decode(bearer);
  const userId = decoded ? decoded.id : null;

  try {
    const transactions = await user_transactions.findAll({
      where: {
        user_id: userId
      }
    });
    if (!transactions) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(transactions);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
}

exports.addUserTransactions = async (req, res) => {
  const token = req.headers['authorization'];
  const bearer = token ? token.split(" ")[1] : undefined;
  const decoded = jwt.decode(bearer);
  const userId = decoded ? decoded.id : null;

  const { product_id } = req.body;

  let id = uuidv4(); 
  let idExists = true;
  while (idExists) {
    const existingId = await user_transactions.findOne({ where: { id } });
    if (!existingId) {
      idExists = false;
    } else {
      id = uuidv4();
    }
  }

  try {
    const reviews = await user_transactions.create({
      id,
      user_id: userId,
      orders_id
    });
    res.json(reviews);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
}