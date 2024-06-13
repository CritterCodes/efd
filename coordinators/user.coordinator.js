/* eslint-disable import/extensions */
import { v4 as uuid } from 'uuid';
import UserModel from '../models/user.model.js';
import User from '../classes/user.js';
import Ajv from 'ajv';
import addFormats from 'ajv-formats';
import userSchema from '../schemas/user.json' assert { type: 'json' };

const ajv = new Ajv();
addFormats(ajv);
const validate = ajv.compile(userSchema);

export default class UserCoordinator {
    static createUser = async (user) => {
        try {
            user.userID = `user-${uuid().slice(-8)}`;
            user.receivedDate = `${new Date()}`;
            const newUser = new User(
                user.userID,
                user.userID,
                user.username,
                user.description,
                user.picture,
                user.bio,
                user.websites,
                user.socials
            );

            const valid = validate(newUser);
            if (!valid) {
                const error = new Error('Validation failed');
                error.statusCode = 400;
                error.type = 'ValidationError';
                error.details = validate.errors;
                throw error;
            }
            const response = await UserModel.createUser(newUser);
            return response;
        } catch (err) {
            console.error('There was an error creating your user before sending to the model. Error:', err);
        }
    };

    static getUserList = async (search) => {
        try {
            const filter = Object.keys(search)[0];
            const value = search[filter];
            const response = await UserModel.getUserList(filter, value);
            return response;
        } catch (err) {
            console.error('There was an error building your search. Error:', err);
        }
    };

    static getUser = async (userID) => await UserModel.getUser(userID);

    static updateUser = async (userID, update) => {
        const updatedUser = new User();
        updatedUser.userID = userID;
        updatedUser.receivedDate = "";
        Object.keys(update).forEach((key) => {
            switch (key) {
                case 'username':
                updatedUser.username = update.status;
                break;
                case 'firsName':
                updatedUser.firstName = update.firstName;
                break;
                case 'lastName':
                updatedUser.lastName = update.lastName;
                break;
                case 'email':
                updatedUser.email = update.email;
                break;
                case 'phoneNumber':
                updatedUser.phoneNumber = update.phoneNumber;
                break;
                case 'accountType':
                updatedUser.accountType = update.accountType;
                break;
                default:
                break;
            }
        });
/*
        const valid = validate(updatedUser);
        if (!valid) {
        const error = new Error('Validation failed');
        error.statusCode = 400;
        error.type = 'ValidationError';
        error.details = validate.errors;
        throw error;
        }*/

        return await UserModel.updateUser(userID, update, updatedUser);
    }

    static deleteUser = async (userID, userTaskID) => await UserModel.deleteUser(userID, userTaskID);

    static addUserSocials = async (userID, tasks) => await UserModel.addUserTasks(userID, tasks);

    static updateUserSocial = async (userID, userTaskID, update) => await UserModel.updateUserTask(userID, userTaskID, update);

    static deleteUserTask = async (userID, userTaskID) => await UserModel.deleteUserTask(userID, userTaskID);
    
}