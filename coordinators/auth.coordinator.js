import AuthModel from '../models/auth.model.js';
import bcrypt from 'bcryptjs';
import User from '../classes/user.js';  // Update the path if necessary
import { v4 as uuid } from 'uuid';


export default class AuthCoordinator {
    static registerUser = async (userData) => {
        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(userData.password, salt);
        userData.userID = uuid();
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


        return AuthModel.createUser(newUser);
    };

    static loginUser = async (username, password) => {
        const user = await AuthModel.findUserByUsername(username);
        if (!user) {
            throw new Error('User not found');
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            throw new Error('Invalid credentials');
        }
        return user;
    };
}
