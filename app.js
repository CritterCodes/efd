/* eslint-disable import/extensions */
import express from 'express';
import bodyParser from 'body-parser';
import errorMiddleware from './middleware/errorHandler.js';
import repairRouter from './routes/repair.routes.js';
import { db } from './lib/database.js';

const { json } = bodyParser;

// This is my express application
const app = express();
const port = 3000;

app.use(json());

app.use('/todo/api/v1', repairRouter);

// Error middleware MUST be last
app.use(errorMiddleware());

// TODO: Environment based configs
const config = {
  url: 'mongodb://localhost:27017/',
  database: '[efd]',
  minPoolSize: 3,
  maxPoolSize: 10,
};

db.init(config);

app.listen(port, () => {
  console.log(`Starting express application on port ${port} @ ${new Date().toISOString()}`);
});
