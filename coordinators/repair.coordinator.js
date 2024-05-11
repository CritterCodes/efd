/* eslint-disable import/extensions */
import { v4 as uuid } from 'uuid';
import RepairModel from '../models/repair.model.js';
import Repair from '../classes/repair.js';
import Ajv from 'ajv';
import { response } from 'express';
/*import addFormats from 'ajv-formats';
import taskSchema from '../schemas/repair.json' assert { type: 'json' };

const ajv = new Ajv();
addFormats(ajv);
const Validate = ajv.compile(repairSchema);*/

export default class RepairCoordinator {
    static createRepair = async (repair) => {
        try {
            repair.repairID = `repair-${uuid().slice(-8)}`;
            repair.recievedDate = new Date();
            const newRepair = new Repair(
                repair.repairID,
                repair.userID,
                repair.description,
                repair.picture,
                repair.recievedDate,
                repair.promiseDate,
                repair.metalType,
                repair.repairTasks
            );
            const response = await RepairModel.createRepair(newRepair);
            return response;
        } catch (err) {
            console.error('There was an error creating your repair before sending to the model. Error:', err);
        }
    }
}