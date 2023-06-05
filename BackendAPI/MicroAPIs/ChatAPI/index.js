const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Sequelize } = require('sequelize');
const chatRoutes = require('./chatRoutes');
const http = require('http');
const { Server } = require('socket.io');
const app = express();
app.use(bodyParser.json());
app.use(cors())

const sequelize = new Sequelize('pha_chat', 'admin', '9n49NvuQZjk6KoLdQLdv', {
  dialect: 'mysql',
  host: 'phasionista-chat.ctjeibahvnce.ap-southeast-1.rds.amazonaws.com'
});
(async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})();


const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://13.55.179.38:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);

  socket.on("join_room", (data) => {
    socket.join(data);
    console.log(`User with ID: ${socket.id} joined room: ${data}`);
  });

  socket.on("send_message", (data) => {
    console.log(data);
    socket.to(data.room).emit("receive_message", data);
  });

  socket.on("disconnect", () => {
    console.log("User Disconnected", socket.id);
  });
});
app.use('/chat', chatRoutes);

server.listen(3011, () => {
  console.log('Server started on port 3011');
});
