// [efd]/coordinators/auth.coordinator.js
import AuthModel from '../models/auth.model.js';
import bcrypt from 'bcryptjs';
import User from '../classes/user.js'; // Update the path if necessary
import { v4 as uuid } from 'uuid';

const AuthCoordinator = {
    registerUser: async (userData) => {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(userData.password, salt);
        userData.userID = `user-${uuid().slice(-8)}`;
        const newUser = new User(
            userData.userID,
            userData.firstName,
            userData.lastName,
            userData.username,
            userData.email,
            hashedPassword,
            userData.phoneNumber,
            userData.accountType
        );

        return AuthModel.createUser(newUser);
    },

    loginUser: async (username, password) => {
        const user = await AuthModel.findUserByUsername(username);
        if (!user) throw new Error('User not found');

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) throw new Error('Invalid credentials');

        return user;
    }
};

export default AuthCoordinator;
