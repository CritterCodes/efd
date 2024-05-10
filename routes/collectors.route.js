import express from 'express';
import {
    createCollector,
    getCollectorList,
    getCollector,
    updateCollector,
    deleteCollector,
} from '../controllers/collector.controller.js';

const collectorRouter = express.Router();

collectorRouter.post('/collectors', createCollector);

collectorRouter.get('/collectors', getCollectorList);

collectorRouter.get('/collectors/:collectorID', getCollector);

collectorRouter.patch('/collectors/:collectorID', updateCollector);

collectorRouter.delete('/collectors/:collectorID', deleteCollector);

export default collectorRouter;