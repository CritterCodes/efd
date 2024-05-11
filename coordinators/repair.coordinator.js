/* eslint-disable import/extensions */
import { v4 as uuid } from 'uuid';
import RepairModel from '../models/repair.model.js';
import Repair from '../classes/repair.js';
import Ajv from 'ajv';
import { response } from 'express';
import addFormats from 'ajv-formats';
import repairSchema from '../schemas/repair.json' assert { type: 'json' };

const ajv = new Ajv();
addFormats(ajv);
const validate = ajv.compile(repairSchema);

export default class RepairCoordinator {
    static createRepair = async (repair) => {
        try {
            repair.repairID = `repair-${uuid().slice(-8)}`;
            repair.receivedDate = `${new Date()}`;
            const newRepair = new Repair(
                repair.repairID,
                repair.userID,
                repair.description,
                repair.picture,
                repair.receivedDate,
                repair.promiseDate,
                repair.metalType,
                repair.repairTasks
            );
            console.log(repair);

            const valid = validate(newRepair);
            if (!valid) {
                const error = new Error('Validation failed');
                error.statusCode = 400;
                error.type = 'ValidationError';
                error.details = validate.errors;
                throw error;
            }
            const response = await RepairModel.createRepair(newRepair);
            return response;
        } catch (err) {
            console.error('There was an error creating your repair before sending to the model. Error:', err);
        }
    };

    static getRepairList = async (search) => {
        try {
            const filter = Object.keys(search)[0];
            const value = search[filter];
            const response = await RepairModel.getRepairList(filter, value);
            return response;
        } catch (err) {
            console.error('There was an error building your search. Error:', err);
        }
    };

    static getRepair = async (repairID) => await RepairModel.getRepair(repairID);

    static updateRepair = async (repairID, update) => {
        
        const updatedRepair = new Repair();
        updatedRepair.repairID = repairID;
        updatedRepair.receivedDate = "";
        Object.keys(update).forEach((key) => {
            switch (key) {
                case 'status':
                updatedRepair.status = update.status;
                break;
                case 'promiseDate':
                updatedRepair.promiseDate = update.promiseDate;
                break;
                case 'metalType':
                updatedRepair.metalType = update.metalType;
                break;
                default:
                break;
            }
        });

        const valid = validate(updatedRepair);
        if (!valid) {
        const error = new Error('Validation failed');
        error.statusCode = 400;
        error.type = 'ValidationError';
        error.details = validate.errors;
        throw error;
        }

        return await ToDoModel.updateTask(toDoList, taskID, update, updatedRepair);
    }
}