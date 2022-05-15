const express = require('express');
const app = express();
const bodyParser = require('body-parser');
require('dotenv').config();
const db = require('./config/database');
const routes = require("./routes/index");
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");


const swaggerOptions = {
    swaggerDefinition: {
        info: {
            title: 'First API ',
            description: 'The description of todolist',
            contacts: {
                name: 'Roman Rubinshteyn'
            },
            servers: ['http://localhost:3000/'],
            version: '1.0.0'
        }
    },
    apis: ['./routes/*.js']
}

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use(bodyParser.json());
app.use("/api", routes);

db.authenticate()
  .then(() => console.log('DB connected!'))
  .catch((err) => console.log('error -> ', err));
const server = app.listen(process.env.PORT, () => console.log('Server started'));

module.exports = server;
