import { db } from '../lib/database.js';
import Constants from '../lib/constants.js';

const readRepair = async (repairID) => {
    try {
        console.log(repairID);
        let response;
        const repair = await db.dbRepairs().findOne(
            { repairID },
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
            { "taskID": `${taskID}` },
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

const listRepairs = async (filter, value) => {
    try {
        let response;
        let list;
        switch (filter) {
            case 'userID':
                list = await db.dbRepairs().find(
                    { "userID": value },
                    { projection: Constants.DEFAULT_PROJECTION },
                  ).toArray();
                break;
            case 'promiseDate':
                list = await db.dbRepairs().find(
                    { "promiseDate": value },
                    { projection: Constants.DEFAULT_PROJECTION },
                  ).toArray();
                break;
            case 'recievedDate':
                list = await db.dbRepairs().find(
                    { "recievedDate": value },
                    { projection: Constants.DEFAULT_PROJECTION },
                  ).toArray();
                break;
            case 'recievedDate':
                list = await db.dbRepairs().find(
                    { "recievedDate": value },
                    { projection: Constants.DEFAULT_PROJECTION },
                  ).toArray();
                break;
            case 'metalType':
                list = await db.dbRepairs().find(
                    { "metalType": value },
                    { projection: Constants.DEFAULT_PROJECTION },
                  ).toArray();
                break;
            default:
                return `Cannot search by ${filter}`;
        }
        
          if (!list) {
                response = {
                    status: false,
                    error: 'There are no repairs matching that filter. Try another filter.',
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
            repair.repairTasks.forEach( async taskID => {
                console.log(`searching for taskID: ${taskID}`);
                const foundTask = await readRepairTask(taskID);
                //console.log(foundTask);
                repair.repairTasks.push(foundTask.repairTask);
                console.log(repair.repairTasks);
                repair.repairTasks.shift();
            });
            //console.log(repair.repairTasks);
            await writeRepair(repair.repairID, repair);
            response = {
                newRepair: repair
            }
            return response;
        } catch (err) {
            console.error(`there was an error writing the new repair to the DB. Error: ${err}`);
        }
    };

    static getRepairList = async (filter, value) => {
        
        let response;
            try {
                // Read the existing tasks
                console.log(filter);
                const repairList = await listRepairs(filter, value);
                if (!repairList.status) {
                    response = repairList.error;
                    console.error(response);
                } else {
                    response = repairList.list;
                }
            } catch (error) {
                return console.error('An error occurred while showing the list:', error.message);
            }
            console.log(response);
            return response;
    };

    static getRepair = async (repairID) => await readRepair(repairID);
};