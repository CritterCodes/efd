import express from 'express';
import {
    createRepair,
    getRepairList,
    getRepair,
    updateRepair,
    deleteRepair,
} from '../controllers/repair.controller.js';

const repairRouter = express.Router();

repairRouter.post('/repairs', createRepair);

repairRouter.get('/repairs', getRepairList);

repairRouter.get('/repairs/:repairID', getRepair);

repairRouter.patch('/repairs/:repairID', updateRepair);

repairRouter.delete('/repairs/:repairID', deleteRepair);

export default repairRouter;