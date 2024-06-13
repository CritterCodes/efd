// [efd]/models/auth.model.js
import { db } from '../lib/database.js';

const AuthModel = {
    createUser: async (newUser) => {
        const collection = db.dbUsers();
        try {
            const result = await collection.insertOne(newUser);
            return result;
        } catch (error) {
            throw new Error('Error creating user: ' + error.message);
        }
    },

    findUserByUsername: async (username) => {
        const collection = db.dbUsers();
        try {
            return await collection.findOne({ username });
        } catch (error) {
            throw new Error('Error finding user: ' + error.message);
        }
    }
};

export default AuthModel;
