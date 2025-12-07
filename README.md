# Real-Time Chat + User List API
Backend assignment implementing:
- `/users` API with 20s Redis caching
- `/online-users` API using Redis SET
- Real-time events with Socket.IO
- Clean folder structure under `/src`

---

## Folder Structure
- src/routes
- src/controller
- src/service
- src/repository
- src/tests
- src/utils
- src/socket
- src/utils
- src/db - it further contains /models /migrations /config /seeders 
- server.js

---

## Setup Instructions
### 1. Clone the repository
git clone https://github.com/VedantRathor/realtime-chat-backend.git

### 2. Install dependencies
npm install

### 3. Create `.env`
PORT=3000

`MySQL`
- DB_HOST=
- DB_USER=
- DB_PASSWORD=
- DB_NAME=
- DB_PORT=

`Redis`
- REDIS_URL=

`Sequelize Config - Development`
- DEV_USERNAME=
- DEV_PASSWORD=
- DEV_DATABASE=
- DEV_HOST=

### 3. Start MySQL (Docker)
Run the following container:
- docker run --name chat-mysql
- -e MYSQL_ROOT_PASSWORD=rootpassword
- -e MYSQL_DATABASE=chat_db
- -e MYSQL_USER=chat_user
- -e MYSQL_PASSWORD=chat_password
- -p 3306:3306
- -d mysql:8.0

### 4. Start Redis (Docker)
docker run --name my-redis -p 6379:6379 -d redis

### 6. Run Sequelize Migrations
npx sequelize-cli db:migrate

### 7. Start the Server
npm start

  


