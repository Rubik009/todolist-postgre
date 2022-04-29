const express = require('express');
const app = express();
const bodyParser = require('body-parser');
require('dotenv').config();
const sequelize = require('sequelize');
const routes = require("./routes/index");


app.use(bodyParser.json());
app.use("/api", routes);

const server = app.listen(process.env.PORT, () => console.log('Server started'));

module.exports = server;
