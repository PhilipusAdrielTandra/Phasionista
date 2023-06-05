const Sequelize = require('sequelize');
const sequelize = new Sequelize('pha_chat', 'admin', '9n49NvuQZjk6KoLdQLdv', {
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

// async function createChat(req, res) {
//   try {
//     const { message, openchat_uuid } = req.body;
//     const chat = await user_chat.create({ message, openchat_uuid });
//     res.json(chat);
//   } catch (error) {
//     console.error(error);
//     res.status(500).send('Internal server error');
//   }
// }

const io = require('socket.io-client')('http://54.252.239.220:3011');

async function createChat(req, res) {
  try {
    const { message, openchat_uuid } = req.body;
    const chat = await user_chat.create({ message, openchat_uuid });

    // Emit the created chat message to all connected clients
    io.emit('chatMessage', chat);

    res.json(chat);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal server error');
  }
}


async function test(req, res){
  res.send("hello world");
}


module.exports = {
  getUserChat,
  createChat,
  getRetailerChat,
  test
};
