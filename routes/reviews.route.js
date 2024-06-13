import {
    getReviews
} from '../controllers/reviews.controller.js';
import express from 'express';

const reviewsRouter = express.Router();

reviewsRouter.get('/reviews', getReviews);

export default reviewsRouter