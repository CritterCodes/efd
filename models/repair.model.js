import { db } from '../lib/database.js';
import Constants from '../lib/constants.js';

const readRepair = async (repairId) => {
    try {
        let response;
        const repair = await db.dbRepairs().findOne(
            { repairId },
            { projection: Constants.DEFAULT_PROJECTION },
          );
          if (!repair) {
                response = {
                    status: false,
                    error: 'That repair does not exist. Try another repairID.',
                };
                console.log(response);
          } else {
            response = {
                status: true,
                repair,
            };
          }
        return response;
    } catch (error) {
        console.error('An error occurred while reading the file:', error.message);
        throw error; // Re-throw the error for handling in the caller function
    }
};

const readRepairTask = async (taskID) => {
    try {
        let response;
        const repairTask = await db.dbRepairTasks().findOne(
            { taskID: `${taskID}` },
            { projection: Constants.DEFAULT_PROJECTION },
          );
          if (!repairTask) {
                response = {
                    status: false,
                    error: 'That task does not exist. Try another taskID.',
                };
                console.log(response);
          } else {
            response = {
                status: true,
                repairTask,
            };
          }
        return response;
    } catch (error) {
        console.error('An error occurred while reading the file:', error.message);
        throw error; // Re-throw the error for handling in the caller function
    }
};

const writeRepair= async (repairID, newRepair) => {
    try {
        let result;
        const oldRepair = await readRepair(repairID);
        if (!oldRepair.status) {
            result = await db.dbRepairs().insertOne(newRepair);
        } else {
            result = await db.dbRepairs().replaceOne({ repairID }, newRepair);
        }
        console.log('Data written to file successfully.');
        return result;
    } catch (error) {
        console.error('An error occurred:', error.message);
    }
};

const removeTask = async (repair, taskID) => {
    const filteredList = repair.list.tasks.filter((task) => task.taskID !== taskID);
    return filteredList;
};

const listRepairs = async (filters) => {
    try {
        let response;
        const list = await db.dbRepairs().findMany(
            { name },
            { projection: Constants.DEFAULT_PROJECTION },
          );
          if (!list) {
                response = {
                    status: false,
                    error: 'That list does not exist. Try another list name.',
                };
                console.log(response);
          } else {
            response = {
                status: true,
                list,
            };
          }
        return response;
    } catch (error) {
        console.error('An error occurred while reading the file:', error.message);
        throw error; // Re-throw the error for handling in the caller function
    }
}

export default class RepairModel {
    static createRepair = async (repair) => {
        try {
            let response;
            let repairTasks = [];
            repair.repairTasks.forEach( async taskID => {
                console.log(`searching for taskID: ${taskID}`);
                const foundTask = await readRepairTask(taskID);
                repairTasks.push(foundTask);
                repair.repairTasks.pop();
            });
            repair.repairTasks = repairTasks;
            await writeRepair(repair.repairID, repair);
            response = {
                newRepair: repair
            }
            return response;
        } catch (err) {
            console.error(`there was an error writing the new repair to the DB. Error: ${err}`);
        }
    };

    static getRepairList = async (filters) => {
        
        let response;
            try {
                // Read the existing tasks
                const tdList = await readList(toDoList);
                if (!tdList.status) {
                    response = tdList.error;
                    console.error(response);
                } else {
                    response = tdList.list;
                }
            } catch (error) {
                return console.error('An error occurred while showing the list:', error.message);
            }
            return response;
    }
};