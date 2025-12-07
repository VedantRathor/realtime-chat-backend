const redisClient = require('../db/redis');

class ChatSocket {
    constructor(io) {
        this.io = io;
        this.registerEvents();
    };

    registerEvents() {
        this.io.on('connection', (socket) => {
            // console.log(`Socket connected: ${socket.id}`);

            socket.on('join_chat', (payload) => {
                this.handleJoinChat(socket, payload)
            });

            socket.on('send_message', (payload) => {
                this.handleSendMessage(socket, payload)
            });

            socket.on('disconnect', () => {
                this.handleDisconnect(socket)
            });
        });
    };

    async handleJoinChat(socket, payload) {
        const { userId, username } = payload;
        if (!userId || !username) return;

        socket.join('global');

        await redisClient.hSet('online_socket_map', socket.id, userId);

        await redisClient.sAdd('online_users', userId);

        // console.log(`${username} joined chat`);

        const onlineUsers = await redisClient.sMembers('online_users');
        this.io.to('global').emit('online_users', onlineUsers);
    };

    handleSendMessage(socket, payload) {
        const { from, message } = payload;
        if (!from || !message) return;

        this.io.to('global').emit('receive_message', {
            from,
            message,
            timestamp: new Date()
        });
    };

    async handleDisconnect(socket) {
        const userId = await redisClient.hGet('online_socket_map', socket.id);
        if (!userId) return;

        await redisClient.sRem('online_users', userId);

        await redisClient.hDel('online_socket_map', socket.id);

        const onlineUsers = await redisClient.sMembers('online_users');
        this.io.to('global').emit('online_users', onlineUsers);

        // console.log(`User disconnected: ${userId}`);
    };
}

module.exports = ChatSocket;
