import express from 'express';
import {
    createRepair,
    getRepairList,
    getRepair,
    updateRepair,
    deleteRepair,
    addRepairTasks,
    updateRepairTask,
    deleteRepairTask,
    getTasks,
    uploadImage
} from '../controllers/repair.controller.js';
import multer from 'multer';

const uploader = multer({
    dest: './browser/assets/repair-imgs',
    limits: {
      fileSize: 5_000_000, // 5MB
    },
  });

const repairRouter = express.Router();

// list all repair tasks
repairRouter.get('/repairs/tasks', getTasks);

//  Create Repair Route

repairRouter.post('/repairs', createRepair);

//  List Repairs

repairRouter.get('/repairs', getRepairList);

//  Add repair task to existing repair

repairRouter.post('/repairs/:repairID', addRepairTasks);

// Add repair Image
repairRouter.post('/repairs/:repairID/images', uploader.single('repairImage'), uploadImage);

//  List single repair

repairRouter.get('/repairs/:repairID', getRepair);

//  Update repair details

repairRouter.patch('/repairs/:repairID', updateRepair);

//  Delete repair

repairRouter.delete('/repairs/:repairID', deleteRepair);

//  Add repair task to existing repair

repairRouter.post('/repairs/:repairID/repair-tasks', addRepairTasks);

//  Update existing repair task

repairRouter.patch('/repairs/:repairID/repair-tasks/:repairTaskID', updateRepairTask);

//  Delete existing repair task

repairRouter.delete('/repairs/:repairID/repair-tasks/:repairTaskID', deleteRepairTask);


export default repairRouter;