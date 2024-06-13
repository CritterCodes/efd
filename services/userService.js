// [efd]/services/userService.js
import { db } from '../lib/database.js'; // Adjust the import to your database connection setup

export const findUserById = async (googleID) => {
    const collection = db.dbUsers();
    try {
        return await collection.findOne({ googleID });
    } catch (error) {
        throw new Error('Error finding user: ' + error.message);
    }
}


export const saveUserData = async (userID, userData) => {
    const collection = db.dbUsers();
    console.log(userID, userData);
    try {
        // Insert the user into the database
        const result = await collection.insertOne(userData);
        console.log(result);
        return result;
    } catch (error) {
        throw new Error('Error creating user: ' + error.message);
    }
}
