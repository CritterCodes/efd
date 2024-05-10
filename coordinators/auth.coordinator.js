import AuthModel from '../models/auth.model.js';
import bcrypt from 'bcryptjs';


export default class AuthCoordinator {
    static registerUser = async (userData) => {
        return AuthModel.createUser(userData);
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
