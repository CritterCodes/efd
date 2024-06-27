import RepairCoordinator from '../coordinators/repair.coordinator.js';
import fs from 'fs';
import { rename } from 'fs/promises';
import { createReadStream, createWriteStream } from "fs";
import {v4 as uuid} from 'uuid';

export const getTasks = async (req, res, next) => RepairCoordinator.getTasks(req.body);

export const createRepair = async (req, res, next) => {
    try {
      console.log(req.body);

      const result = await RepairCoordinator.createRepair(req.body);

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

export const uploadImage = async (req, res, next) => {
  try {
    console.log('File received:', req.file); // Log the received file
    if (!req.file) {
      return res.status(400).send('No file uploaded.');
    }

    if (req.file.mimetype.indexOf('image') < 0) {
      return res.status(400).send('Invalid file type.');
    }

    const newFilename = `${req.file.destination}/${req.file.originalname}`;
    await rename(req.file.path, newFilename);

    const result = await RepairCoordinator.addImageToRepair(req.params.repairID, newFilename.slice(9));

    if (result) {
      res.status(204).json();
    } else {
      res.status(404).json();
    }
  } catch (ex) {
    next(ex);
  }
};