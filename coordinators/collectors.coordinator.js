/* eslint-disable import/extensions */
import { v4 as uuid } from 'uuid';
import ToDoModel from '../models/to-do.model.js';
import Task from '../classes/task.js';
import Ajv from 'ajv';
import addFormats from 'ajv-formats';
import taskSchema from '../schemas/task.json' assert { type: 'json' };

const ajv = new Ajv();
addFormats(ajv);
const Validate = ajv.compile(repairSchema);

export default class RepairCoordinator {
    static createRepair = async (repair) => {
        
    }
}