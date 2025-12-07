const redisClient = require('../db/redis');
const { User } = require('../../models');
const userRepository = require('../repository/UserRepository');

class UserService {
    async getAllUsers() {
        try {
            const cachedUsers = await redisClient.get('users_cache');

            if (cachedUsers) {
                // console.log('Redis has data');
                return JSON.parse(cachedUsers);
            }

            // Cache Miss
            const users = await userRepository.findAllUsers();
            // console.log('users: ', users);

            await redisClient.setEx('users_cache', 20, JSON.stringify(users));

            return users;
        } catch (err) {
            // console.error(err);
            throw err;
        }
    };
    
    async getAllOnlineUsers() {
        try {
            return await redisClient.sMembers('online_users');
        }  catch (err) {
            // console.error(err);
            throw err;
        }
    };
}

module.exports = new UserService();
