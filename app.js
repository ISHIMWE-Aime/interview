const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const { router } = require('./routes');
require('dotenv').config();

const PORT = process.env.PORT || 3000;

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'To do list APIs',
      version: '1.0.0',
    },

    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [{ jwt: [] }],
    servers: [
      {
        url: 'https://talented-drawers-mite.cyclic.cloud',
      },
      {
        url: 'http://localhost:3000',
      },
    ],
  },
  apis: ['./documentation/*.yml'],
};

const swaggerSpec = swaggerJsdoc(options);

const app = express();

// middleware;
app.use(cors());
app.use(express.json());
app.use(
  '/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, { explorer: true }),
)
app.use(router);

mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.l46wlrf.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`,
  )
  .then(
    app.listen(PORT, () => {
      console.log(`Server is started on the this port ${PORT}`);
    }),
  )
  .catch((err) => {
    console.log(err);
  });

module.exports = { app };
