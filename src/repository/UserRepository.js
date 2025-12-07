const { User } = require('../../models');

class UserRepository {
    async findAllUsers() {
        return await User.findAll({
            attributes: ['user_id', 'username', 'email', 'created_at', 'updated_at']
        });
    };
}

module.exports = new UserRepository();