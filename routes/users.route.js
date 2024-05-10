import express from 'express';
import {
    createUser,
    getUserList,
    getUser,
    updateUser,
    deleteUser,
} from '../controllers/user.controller.js';

const userRouter = express.Router();

userRouter.post('/users', createUser);

userRouter.get('/users', getUserList);

userRouter.get('/users/:userID', getUser);

userRouter.patch('/users/:userID', updateUser);

userRouter.delete('/users/:userID', deleteUser);

export default userRouter;