const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const dotenv = require('dotenv');
dotenv.config();

const dbConnect = require('./config/dbConnect');
const setupSocket = require('./socket/setupSocket');
const chatRoutes = require("./routes/chat.route");

const app = express();
const server = http.createServer(app);
const io = new Server(server);
const cors = require('cors');
dbConnect();





app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(cors());


app.use('/api/chat', chatRoutes);


setupSocket(io);

server.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
