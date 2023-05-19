const Sequelize = require('sequelize');
const sequelize = new Sequelize('pha_chat', 'admin', 'password', {
    host: 'phasionista-chat.ctjeibahvnce.ap-southeast-1.rds.amazonaws.com',
    dialect: 'mysql',
  });

const initModels = require('./chatModels/init-models')(sequelize); 
const { user_chat, retailer_chat, user_openchat_retail } = initModels

async function getUserChat(req, res) {
  try {
    const openchat_uuid = req.params.id;
    const chats = await user_chat.findAll({
      where: { openchat_uuid: openchat_uuid}, 
    });
    res.json(chats);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal server error');
  }
}

async function getRetailerChat(req, res) {
  try {
    const openchat_uuid = req.params.id;
    const chats = await retailer_chat.findAll({
      where: { openchat_uuid: openchat_uuid}, 
    });
    res.json(chats);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal server error');
  }
}

async function createChat(req, res) {
  try {
    const { message, openchat_uuid } = req.body;
    const chat = await user_chat.create({ message, openchat_uuid });
    res.json(chat);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal server error');
  }
}

module.exports = {
  getUserChat,
  createChat,
  getRetailerChat
};
