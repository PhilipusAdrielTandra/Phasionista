const { user_chat } = require('./models');

async function getChats(req, res) {
  try {
    const openchat_uuid = req.query.uuid;
    const chats = await user_chat.findAll({
      where: { openchat_uuid },
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
  getChats,
  createChat,
};
