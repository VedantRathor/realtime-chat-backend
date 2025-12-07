require('dotenv').config();

const http = require('http');

const app = require('./src/app');
const { Server } = require('socket.io');
const initializeSockets = require('./src/socket');

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: '*'
    },
});

initializeSockets(io);

// Starting our server on PORT
const PORT = process.env.PORT;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
