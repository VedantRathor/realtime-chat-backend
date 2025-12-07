const ChatSocket = require('./ChatSocket');

module.exports = (io) => {
    new ChatSocket(io);
};
