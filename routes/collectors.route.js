import express from 'express';
import {
    createCollector,
    getCollectorList,
    getCollector,
    updateCollector,
    deleteCollector,
} from '../controllers/collectors.controller.js';

const collectorRouter = express.Router();

//  api/efd/v1/collectors

collectorRouter.get('/collectors', getCollectorList);

collectorRouter.post('/collectors/:userID', createCollector);

collectorRouter.get('/collectors/:collectorID', getCollector);

collectorRouter.patch('/collectors/:collectorID', updateCollector);

collectorRouter.delete('/collectors/:collectorID', deleteCollector);

export default collectorRouter;