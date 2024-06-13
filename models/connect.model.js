import { db } from '../lib/database.js';
import { readCollector } from './collectors.model.js';
import { readUser } from './user.model.js'

export default class ConnectModel {

    static getCollector = async (collectorID) => {
        try {
            const result = await readCollector(collectorID);
            if (!result.status) {
                console.error(response);
                return { error: result.error };
            } else {
                const userResult = await readUser(result.collector.userID);
                result.collector.username = userResult.user.username;
            }
            console.log(result.collector.username);

            if (!result.collector.userID) {
                return { redirect: `/connect/${result.collector.collectorID}` };
            } else {
                return { redirect: `/collectors/${result.collector.username}` };
            }

        } catch (err) {
            console.error(`There was an error getting the collector in the model. Error: ${err}`);
        }
    };
}