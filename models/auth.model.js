import { db } from '../lib/database.js';
import bcrypt from 'bcryptjs';
import User from '../classes/user.js';  // Update the path if necessary

export default class AuthModel {

    static createUser = async (userData) => {
        const collection = db.dbUsers();
        try {
            // Hash the password
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(userData.password, salt);

            // Create a new User instance with hashed password
            const newUser = new User(
                userData.userID,
                userData.firstName,
                userData.lastName,
                userData.username,
                userData.email,
                hashedPassword, // Use the hashed password
                userData.phoneNumber,
                userData.accountType
            );

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
