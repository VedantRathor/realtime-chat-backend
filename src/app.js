const express = require('express');
const userRoutes = require('./routes/UserRoutes');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/users', userRoutes);

module.exports = app;
