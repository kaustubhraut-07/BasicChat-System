const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const dotenv = require('dotenv');
dotenv.config();

const dbConnect = require('./config/dbConnect');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

dbConnect();





app.use(express.json());


server.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
