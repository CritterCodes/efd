import { db } from '../lib/database.js';

export default class AuthModel {

    static createUser = async (userData) => {
        const collection = db.dbUsers();
        try {
            // Insert the user into the database
            const result = await collection.insertOne(newUser);
            return result;
        } catch (error) {
            throw new Error('Error creating user: ' + error.message);
        }
    }

    static findUserByUsername = async (username) => {
        const collection = db.dbUsers();
        try {
            return await collection.findOne({ username: username });
        } catch (error) {
            throw new Error('Error finding user: ' + error.message);
        }
    }
}
