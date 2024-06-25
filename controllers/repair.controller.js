import RepairCoordinator from '../coordinators/repair.coordinator.js';
import fs from 'fs';
import { createReadStream, createWriteStream } from "fs";
import {v4 as uuid} from 'uuid';

export const getTasks = async (req, res, next) => RepairCoordinator.getTasks(req.body);

export const createRepair = async (req, res, next) => {
    try {
      console.log(req.body);
      var newDir = `./public/users/usr-imgs/${req.body.userID}`;

      if (!fs.existsSync(newDir)){
          fs.mkdirSync(newDir);
      }

      
      const imagePath = `${newDir}/img-${uuid().slice(16)}.png`;
      const saveImage = createWriteStream(`./${imagePath}`);
      saveImage.on('open', () => req.pipe(saveImage));
      saveImage.on('close', () => {
        res.sendStatus(200);
      });
      const result = await RepairCoordinator.createRepair(req.body, imagePath);

      if (result) {
          res.status(200).json(result);
        } else {
          res.status(404).json();
        }
    } catch (ex) {
        next(ex);
    }
};


export const getRepairList = async (req, res, next) => {
    try {
        const result = await RepairCoordinator.getRepairList(req.body);

        if (result) {
            res.status(200).json(result);
          } else {
            res.status(404).json();
          }
    } catch (ex) {
        next(ex);
    }
};

export const getRepair = async (req, res, next) => {
    try {
        const result = await RepairCoordinator.getRepair(req.params.repairID);

        if (result) {
            res.status(200).json(result);
          } else {
            res.status(404).json();
          }
    } catch (ex) {
        next(ex);
    }
};

export const updateRepair = async (req, res, next) => {
    try {
        const result = await RepairCoordinator.updateRepair(req.params.repairID, req.body);

        if (result) {
            res.status(200).json(result);
          } else {
            res.status(404).json();
          }
    } catch (ex) {
        next(ex);
    }
};

export const deleteRepair = async (req, res, next) => {
  try {
      const result = await RepairCoordinator.deleteRepair(req.params.repairID);

      if (result) {
          res.status(200).json(result);
        } else {
          res.status(404).json();
        }
  } catch (ex) {
      next(ex);
  }
};

export const addRepairTasks = async (req, res, next) => {
  try {
    const result = await RepairCoordinator.addRepairTasks(req.params.repairID, req.body.repairTasks);

    if (result) {
      res.status(200).json(result);
    } else {
      res.status(404).json();
    }
  } catch (ex) {
    next(ex);
  }
}

export const updateRepairTask = async (req, res, next) => {
  try {
    const result = await RepairCoordinator.updateRepairTask(req.params.repairID, req.params.repairTaskID, req.body.repairTask);

    if (result) {
      res.status(200).json(result);
    } else {
      res.status(404).json();
    }
  } catch (ex) {
    next(ex);
  }
}

export const deleteRepairTask = async (req, res, next) => {
  try {
    const result = await RepairCoordinator.deleteRepairTask(req.params.repairID, req.params.repairTaskID);

    if (result) {
      res.status(200).json(result);
    } else {
      res.status(404).json();
    }
  } catch (ex) {
    next(ex);
  }
}