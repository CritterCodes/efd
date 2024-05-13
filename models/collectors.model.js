import { db } from '../lib/database.js';
import Constants from '../lib/constants.js';

const readCollector = async (collectorID) => {
    try {
        console.log(collectorID);
        let response;
        const collector = await db.dbCollectors().findOne(
            { collectorID },
            { projection: Constants.DEFAULT_PROJECTION },
        );
        if (!collector) {
            response = {
                status: false,
                error: 'That collector does not exist. Try another collectorID.',
            };
            console.log(response);
        } else {
            response = {
                status: true,
                collector,
            };
        }
        return response;
    } catch (error) {
        console.error('An error occurred while reading the file:', error.message);
        throw error; // Re-throw the error for handling in the caller function
    }
};

const readcollectorSocials = async (collectorID, site) => {
    try {
        let response;
        const collector = await readCollector(collectorID);
        if (!collector.status) {
            response = tdList;
            console.log(response);
        } else {
            const socialSite = collector.socials.find((social) => social.site === site);
            if (!collectorTask) {
                response = {
                    status: false,
                    error: `That social site does not exist on ${collectorID}. Try double check your site and collectorID.`,
                };
                console.log(response);
            } else {
                response = {
                    status: true,
                    socialSite,
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
        const collectorTask = await db.dbcollectorTasks().findOne(
            { "taskID": `${taskID}` },
            { projection: Constants.DEFAULT_PROJECTION },
        );
        if (!collectorTask) {
            response = {
                status: false,
                error: 'That task does not exist. Try another taskID.',
            };
            console.log(response);
        } else {
            response = {
                status: true,
                collectorTask,
            };
        }
        return response;
    } catch (error) {
        console.error('An error occurred while reading the file:', error.message);
        throw error; // Re-throw the error for handling in the caller function
    }
};

const writecollector = async (collectorID, newcollector) => {
    try {
        let result;
        const oldcollector = await readcollector(collectorID);
        if (!oldcollector.status) {
            result = await db.dbcollectors().insertOne(newcollector);
        } else {
            result = await db.dbcollectors().replaceOne({ collectorID }, newcollector);
        }
        console.log('Data written to file successfully.');
        return result;
    } catch (error) {
        console.error('An error occurred:', error.message);
    }
};

const removecollectorTask = async (collector, collectorTaskID) => {
    const filteredList = collector.collectorTasks.filter((task) => task.collectorTaskID !== collectorTaskID);
    return filteredList;
};

const listcollectors = async (filter, value) => {
    try {
        let response;
        let list;
        if (filter) {
            switch (filter) {
                case 'collectorID':
                    list = await db.dbcollectors().find(
                        { "collectorID": value },
                        { projection: Constants.DEFAULT_PROJECTION },
                    ).toArray();
                    break;
                case 'userID':
                    list = await db.dbcollectors().find(
                        { "userID": value },
                        { projection: Constants.DEFAULT_PROJECTION },
                    ).toArray();
                    break;
                case 'promiseDate':
                    list = await db.dbcollectors().find(
                        { "promiseDate": value },
                        { projection: Constants.DEFAULT_PROJECTION },
                    ).toArray();
                    break;
                case 'recievedDate':
                    list = await db.dbcollectors().find(
                        { "recievedDate": value },
                        { projection: Constants.DEFAULT_PROJECTION },
                    ).toArray();
                    break;
                case 'recievedDate':
                    list = await db.dbcollectors().find(
                        { "recievedDate": value },
                        { projection: Constants.DEFAULT_PROJECTION },
                    ).toArray();
                    break;
                case 'metalType':
                    list = await db.dbcollectors().find(
                        { "metalType": value },
                        { projection: Constants.DEFAULT_PROJECTION },
                    ).toArray();
                    break;
                default:
                    return `Cannot search by ${filter}`;
            }
        } else {
            list = await db.dbcollectors().find().toArray();
        }

        if (!list) {
            response = {
                status: false,
                error: 'There are no collectors matching that filter. Try another filter.',
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

export class CollectorsModel {
    static createCollector = async (profile) => {
        let reponse;
        try {

        } catch (error) {

        }
    }
}