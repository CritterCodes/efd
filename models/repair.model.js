import { db } from '../lib/database.js';
import Constants from '../lib/constants.js';
import { v4 as uuid } from 'uuid';
import { response } from 'express';

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

const readRepairTask = async (repairID, repairTaskID) => {
    try {
        let response;
        const repair = await readRepair(repairID);
        if (!repair.status) {
            response = tdList;
            console.log(response);
        } else {
            const repairTask = repair.repair.repairTasks.find((ftask) => ftask.repairTaskID === repairTaskID);
            if (!repairTask) {
                response = {
                    status: false,
                    error: `That task does not exist on ${repairID}. Try double check your repairTaskID and repairID.`,
                };
                console.log(response);
            } else {
                response = {
                    status: true,
                    repairTask,
                };
            }
        }
        return response;
    } catch (error) {
        console.error('An error occurred while reading the file:', error.message);
        throw error;
    }
};

const getTask = async (taskID) => {
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



const writeRepair = async (repairID, newRepair) => {
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

const removeRepairTask = async (repair, repairTaskID) => {
    const filteredList = repair.repairTasks.filter((task) => task.repairTaskID !== repairTaskID);
    return filteredList;
};

const listRepairs = async (filter, value) => {
    try {
        let response;
        let list;
        if (filter) {
            switch (filter) {
                case 'repairID':
                    list = await db.dbRepairs().find(
                        { "repairID": value },
                        { projection: Constants.DEFAULT_PROJECTION },
                    ).toArray();
                    break;
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
        } else {
            list = await db.dbRepairs().find().toArray();
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
    static getTasks = async (body) => {
        try { 
            const response =  await db.dbRepairTasks().find().toArray();
            console.log(response);
            return response;
        } catch (err) {
            console.error(err);
        }   
    }
    static createRepair = async (repair) => {
        try {
            let response;
            repair.repairTasks.forEach(async taskID => {
                console.log(`searching for taskID: ${taskID}`);
                const foundTask = await getTask(taskID);
                foundTask.repairTask.repairTaskID = `task-${uuid().slice(-8)}`;
                console.log(foundTask);
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

    static addImageToRepair = async (repairID, picture) => {
        const result = await readRepair(repairID);
        result.repair.picture = picture;
        return await writeRepair(repairID, result.repair);
    }

    static uploadImage = async (repairID, imagePath) => {
        const update = {
          $set: {
            imagePath,
          },
        };
    
        return db.dbRepairs().updateOne({ id }, update);
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

    static getRepair = async (repairID) => {
        const repair = await readRepair(repairID);
        return repair.repair;
    };

    static updateRepair = async (repairID, updatedRepair) => {
        let response;
        try {
            // Read the existing tasks
            const repair = await readRepair(repairID);
            if (!repair.status) {
                response = repair.error;
                console.error(response);
            } else {
                Object.keys(repair.repair).forEach((repairKey) => {
                    if (updatedRepair[repairKey] && repairKey === 'recievedDate') {
                        return;
                    } else if (updatedRepair[repairKey]) {
                        repair.repair[repairKey] = updatedRepair[repairKey];
                    }
                });

                response = {
                    updatedRepair: repair.repair
                };
            }
            writeRepair(repairID, repair.repair);
            console.log(response);
        } catch(error) {
        console.error('An error occurred while updating the task:', error.message);
    }
        return response;
    };

    static deleteRepair = async (repairID) => {
        let response;
        try {
            const repair = await readRepair(repairID);
            if (!repair.status) {
                response = repair.error;
                console.error(response);
            } else {
                response = {
                    deletedRepair: repair.repair
                };
                await db.dbRepairs().deleteOne(
                    { repairID }
                )
            }
        } catch (error) {
            console.error('An error occurred while deleting the task:', error.message);
        }
        return response;
    };


    static addRepairTasks = async (repairID, tasks) => {
        try {
            const repair = await readRepair(repairID);
            tasks.forEach(async (task) => {
                const repairTask = await getTask(task);
                repairTask.repairTask.repairTaskID = `task-${uuid().slice(-8)}`
                repair.repair.repairTasks.push(repairTask.repairTask);
            })
            const response = {
                updatedRepair: repair
            }
            await writeRepair(repairID, repair.repair);
            return response;
        } catch (error) {
            console.error('An error occurred while adding the new repair tasks:', error.message);
        }
    }

    static updateRepairTask = async (repairID, repairTaskID, update) => {
        let response;
        try {
            // Read the existing tasks
            const repair = await readRepair(repairID);
            if (!repair.status) {
                response = repair.error;
                console.error(response);
            } else {
                const foundTask = await getTask(update)
                const importedTask = await readRepairTask(repairID, repairTaskID);
                if (!importedTask.status) {
                    response = importedTask.error;
                } else {
                    const newRepairTasks = await removeRepairTask(repair.repair, repairTaskID);
                    newRepairTasks.push(foundTask.repairTask);
                    repair.repair.repairTasks = newRepairTasks;
                }
                writeRepair(repairID, repair.repair);
                response = {
                    updatedTask: importedTask.repairTask,
                    updatedRepair: repair.repair
                }
            }
        } catch (error) {
            console.error('An error occurred while updating the task:', error.message);
        }
        return response;
    };

    static deleteRepairTask = async (repairID, repairTaskID) => {
        let response;
        try {
            // Read the existing tasks
            const repair = await readRepair(repairID);
            if (!repair.status) {
                response = tdList.error;
                console.error(response);
            } else {
                const removedTask = await readRepairTask(repairID, repairTaskID);
                if (!removedTask.status) {
                    response = removedTask.error;
                } else {
                    repair.repair.repairTasks = await removeRepairTask(repair.repair, repairTaskID);
                    response = {
                        deletedTask: removedTask.repairTask,
                        newList: repair.repair,
                    };
                    // Filter out the task with the specified id

                    // Write the updated tasks back to the file
                    await writeRepair(repairID, repair.repair);
                    console.log('Task deleted successfully.');
                    console.log(response);
                }
            }
        } catch (error) {
            console.error('An error occurred while deleting the task:', error.message);
        }
        return response;
    };

};