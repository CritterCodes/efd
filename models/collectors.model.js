import { db } from '../lib/database.js';
import Constants from '../lib/constants.js';
import Collector from '../classes/collector.js';

export const readCollector = async (identifier) => {
    try {
        console.log(identifier);
        let collector;
        let result;
        if (identifier.includes('collector')) {
            const collectorID = identifier;
            console.log(collectorID);
            result = await db.dbCollectors().aggregate([
                {
                    $match: { collectorID }  // Step 1: Match the user by username
                },
                {
                    $lookup: {  // Step 2: Perform the join with the collectors collection
                        from: "users",
                        localField: "userID",
                        foreignField: "userID",
                        as: "userDetails"
                    }
                },
                {
                    $unwind: "$userDetails"  // Step 3: Unwind the joined documents (if only one document is expected)
                }
            ]).toArray();
            collector = new Collector(
                collectorID,
                result[0].userID,
                result[0].userDetails.username,
                `${result[0].userDetails.firstName} ${result[0].userDetails.lastName}`,
                result[0].picture,
                result[0].bio,
                result[0].userDetails.bio,
                result[0].userDetails.phoneNumber,
                result[0].websites,
                result[0].socials
            );

        } else {
            const username = identifier;
            result = await db.dbUsers().aggregate([
                {
                    $match: { username }  // Step 1: Match the user by username
                },
                {
                    $lookup: {  // Step 2: Perform the join with the collectors collection
                        from: "collectors",
                        localField: "userID",
                        foreignField: "userID",
                        as: "collectorDetails"
                    }
                },
                {
                    $unwind: "$collectorDetails"  // Step 3: Unwind the joined documents (if only one document is expected)
                }
            ]).toArray();
            collector = new Collector(
                result[0].collectorDetails.collectorID,
                result[0].userID,
                username,
                `${result.firstName} ${result.lastName}`,
                result[0].collectorDetails.picture,
                result[0].collectorDetails.bio,
                result[0].bio,
                result[0].phoneNumber,
                result[0].collectorDetails.websites,
                result[0].collectorDetails.socials
            );
        }
        let response;
        if (!result[0]) {
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

const readCollectorSocials = async (collectorID, site) => {
    try {
        let response;
        const collector = await readCollector(collectorID);
        if (!collector.status) {
            response = tdList;
            console.log(response);
        } else {
            const socialSite = collector.socials.find((social) => social.site === site);
            if (!socialSite) {
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

const writeCollector = async (collectorID, newCollector) => {
    try {
        let result;
        const oldCollector = await readCollector(collectorID);
        if (!oldCollector.status) {
            result = await db.dbCollectors().insertOne(newCollector);
        } else {
            result = await db.dbCollectors().replaceOne({ collectorID }, newCollector);
        }
        console.log('Data written to file successfully.');
        return result;
    } catch (error) {
        console.error('An error occurred:', error.message);
    }
};

const removeCollectorTask = async (collector, collectorTaskID) => {
    const filteredList = collector.collectorTasks.filter((task) => task.collectorTaskID !== collectorTaskID);
    return filteredList;
};

const listCollectors = async (filter, value) => {
    try {
        let response;
        let list;
        if (filter) {
            switch (filter) {
                case 'collectorID':
                    list = await db.dbCollectors().find(
                        { "collectorID": value },
                        { projection: Constants.DEFAULT_PROJECTION },
                    ).toArray();
                    break;
                default:
                    return `Cannot search by ${filter}`;
            }
        } else {
            list = await db.dbCollectors().find().toArray();
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

export default class CollectorModel {
    static createCollector = async (collector) => {
        try {
            let response;
            console.log(collector.collectorTasks);
            await writeCollector(collector.collectorID, collector);
            response = {
                newCollector: collector
            }
            return response;
        } catch (err) {
            console.error(`there was an error writing the new collector to the DB. Error: ${err}`);
        }
    };

    static getCollectorList = async (filter, value) => {

        let response;
        try {
            // Read the existing tasks
            console.log(filter);
            const collectorList = await listCollectors(filter, value);
            if (!collectorList.status) {
                response = collectorList.error;
                console.error(response);
            } else {
                response = collectorList.list;
            }
        } catch (error) {
            return console.error('An error occurred while showing the list:', error.message);
        }
        console.log(response);
        return response;
    };

    static getCollector = async (collectorID) => {
        let response;
        try {
            const collector = await readCollector(collectorID);
            if (!collector.status) {
                response = collector.error;
                console.error(response);
            } else {
                response = collector.collector;
            }
            return response;
        } catch (error) {
            return console.error('An error occurred while showing the collector:', error.message);
        }
    };

    static updateCollector = async (collectorID, updatedCollector) => {
        let response;
        try {
            // Read the existing tasks
            const collector = await readCollector(collectorID);
            if (!collector.status) {
                response = collector.error;
                console.error(response);
            } else {
                Object.keys(collector.collector).forEach((collectorKey) => {
                    if (updatedCollector[collectorKey] && collectorKey === 'recievedDate') {
                        return;
                    } else if (updatedCollector[collectorKey]) {
                        collector.collector[collectorKey] = updatedCollector[collectorKey];
                    }
                });

                response = {
                    updatedCollector: collector.collector
                };
            }
            writeCollector(collectorID, collector.collector);
            console.log(response);
        } catch (error) {
            console.error('An error occurred while updating the task:', error.message);
        }
        return response;
    };

    static deleteCollector = async (collectorID) => {
        let response;
        try {
            const collector = await readCollector(collectorID);
            if (!collector.status) {
                response = collector.error;
                console.error(response);
            } else {
                response = {
                    deletedCollector: collector.collector
                };
                await db.dbCollectors().deleteOne(
                    { collectorID }
                )
            }
        } catch (error) {
            console.error('An error occurred while deleting the task:', error.message);
        }
        return response;
    };
};