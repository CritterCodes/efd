import { Router } from 'express';
import { getCollector } from '../controllers/connect.controller.js';

const connectRouter = Router();

connectRouter.get('/connect/:collectorID', getCollector);

export default connectRouter;