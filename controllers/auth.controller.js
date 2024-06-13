import jwt from 'jsonwebtoken';
import AuthCoordinator from '../coordinators/auth.coordinator.js';


export const signup = async (req, res) => {
    try {
        const result = await AuthCoordinator.registerUser(req.body);
        if (result.insertedId) {
            res.status(201).json({ message: 'User created successfully', userId: result.insertedId.toString() });
        } else {
            throw new Error('User registration failed');
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await AuthCoordinator.loginUser(username, password);
        const token = jwt.sign(
            { userID: user.userID, username: user.username, accountType: user.accountType },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '1h' }
        );
        console.log(user.userID);
        console.log(token);
        res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
        res.status(401).json({ message: error.message });
    }
};
