const userService = require('../service/UserService');
const ApiResponse = require('../utils/ApiResponse');

class UserController {
    async getUsers(req, res, next) {
        try {
            const users = await userService.getAllUsers();
            // console.log("users: ", users);

            return ApiResponse.send(res,{
               message: "Users fetched successfully",
               data: users
            });

        } catch (err) {
            return ApiResponse.error(res,{
                message: "Something went wrong | UserController | getUsers()",
                error: err.message
            });
        }
    };

    async getOnlineUsers(req, res, next) {
      try {
          const onlineUsers = await userService.getAllOnlineUsers();
          // console.log(onlineUsers);

          return ApiResponse.send(res,{
              message: "Online users fetched successfully from the redis",
              data: onlineUsers
          });

      } catch (err) {
          // console.log("controller | UserController: ", err);
          return ApiResponse.error(res,{
              message: "Something went wrong | UserController | getOnlineUsers()",
              error: err.message
          });
      }
    };
}

module.exports = new UserController();
