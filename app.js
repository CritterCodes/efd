import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import session from 'express-session';
import repairRouter from './routes/repair.route.js';
import collectorRouter from './routes/collectors.route.js'
import authRouter from './routes/auth.route.js';
import userRouter from './routes/users.route.js'; 
import connectRouter from './routes/connect.route.js';
import reviewsRouter from './routes/reviews.route.js';
import { db } from './lib/database.js';

const { json } = bodyParser;

// This is my express application
const app = express();
const port = 3000;


app.use(session({
  secret: process.env['SESSION_SECRET'],
  resave: false,
  saveUninitialized: false
}));


app.use(express.json());
app.use(express.static('browser'));

// Use CORS middleware
app.use(cors({
  origin: 'http://localhost:4200/' // Replace with your Angular app's origin
}));
app.use('/api/v1', repairRouter);
app.use('/api/v1', userRouter);
app.use('/api/v1', authRouter); // Adjust the path to your auth routes
app.use('/api/v1', collectorRouter);
app.use('/api/v1', connectRouter);
app.use('/api/v1', reviewsRouter)

// Error middleware MUST be last
//app.use(errorMiddleware());

// TODO: Environment based configs
const config = {
  url: process.env['MONGO_URL'],
  database: '[efd]',
  minPoolSize: 3,
  maxPoolSize: 10,
};

db.init(config);

dotenv.config();

app.listen(port, () => {
  console.log(`Starting express application on port ${port} @ ${new Date().toISOString()}`);
});
