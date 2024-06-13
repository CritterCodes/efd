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

collectorRouter.post('/collectors', createCollector);

collectorRouter.get('/collectors/:identifier', getCollector);

collectorRouter.patch('/collectors/:collectorID', updateCollector);

collectorRouter.delete('/collectors/:collectorID', deleteCollector);

export default collectorRouter;