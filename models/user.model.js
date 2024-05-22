import { db } from '../lib/database.js';
import Constants from '../lib/constants.js';

const readUser = async (userID) => {
    try {
        console.log(userID);
        let response;
        const user = await db.dbUsers().findOne(
            { userID },
            { projection: Constants.DEFAULT_PROJECTION },
        );
        if (!user) {
            response = {
                status: false,
                error: 'That user does not exist. Try another userID.',
            };
            console.log(response);
        } else {
            response = {
                status: true,
                user,
            };
        }
        return response;
    } catch (error) {
        console.error('An error occurred while reading the file:', error.message);
        throw error; // Re-throw the error for handling in the caller function
    }
};

const readUserSocials = async (userID, site) => {
    try {
        let response;
        const user = await readUser(userID);
        if (!user.status) {
            response = tdList;
            console.log(response);
        } else {
            const socialSite = user.socials.find((social) => social.site === site);
            if (!userTask) {
                response = {
                    status: false,
                    error: `That social site does not exist on ${userID}. Try double check your site and userID.`,
                };
                console.log(response);
            } else {
                response = {
                    status: true,
                    socialSite,
                };
            }
        }
        return response;
    } catch (error) {
        console.error('An error occurred while reading the file:', error.message);
        throw error;
    }
};

const getTask = async (taskID) => {
    try {
        let response;
        const userTask = await db.dbUserTasks().findOne(
            { "taskID": `${taskID}` },
            { projection: Constants.DEFAULT_PROJECTION },
        );
        if (!userTask) {
            response = {
                status: false,
                error: 'That task does not exist. Try another taskID.',
            };
            console.log(response);
        } else {
            response = {
                status: true,
                userTask,
            };
        }
        return response;
    } catch (error) {
        console.error('An error occurred while reading the file:', error.message);
        throw error; // Re-throw the error for handling in the caller function
    }
};

const writeUser = async (userID, newUser) => {
    try {
        let result;
        const oldUser = await readUser(userID);
        if (!oldUser.status) {
            result = await db.dbUsers().insertOne(newUser);
        } else {
            result = await db.dbUsers().replaceOne({ userID }, newUser);
        }
        console.log('Data written to file successfully.');
        return result;
    } catch (error) {
        console.error('An error occurred:', error.message);
    }
};

const removeUserTask = async (user, userTaskID) => {
    const filteredList = user.userTasks.filter((task) => task.userTaskID !== userTaskID);
    return filteredList;
};

const listUsers = async (filter, value) => {
    try {
        let response;
        let list;
        if (filter) {
            switch (filter) {
                case 'userID':
                    list = await db.dbUsers().find(
                        { "userID": value },
                        { projection: Constants.DEFAULT_PROJECTION },
                    ).toArray();
                    break;
                    case 'email':
                        list = await db.dbUsers().find(
                            { "email": value },
                            { projection: Constants.DEFAULT_PROJECTION },
                        ).toArray();
                        break;
                    case 'firstName':
                        list = await db.dbUsers().find(
                            { "firstName": value },
                            { projection: Constants.DEFAULT_PROJECTION },
                        ).toArray();
                        break;
                    case 'lastName':
                        list = await db.dbUsers().find(
                            { "lastName": value },
                            { projection: Constants.DEFAULT_PROJECTION },
                        ).toArray();
                        break;
                default:
                    return `Cannot search by ${filter}`;
            }
        } else {
            list = await db.dbUsers().find().toArray();
        }

        if (!list) {
            response = {
                status: false,
                error: 'There are no users matching that filter. Try another filter.',
            };
            console.log(response);
        } else {
            response = {
                status: true,
                list,
            };
        }
        return response;
    } catch (error) {
        console.error('An error occurred while reading the file:', error.message);
        throw error; // Re-throw the error for handling in the caller function
    }
}

export default class UserModel {
    static createUser = async (profile) => {
        let reponse;
        try {

        } catch (error) {

        }
    }

    static getUserList = async (filter, value) => {

        let response;
        try {
            // Read the existing tasks
            console.log(filter);
            const userList = await listUsers(filter, value);
            if (!userList.status) {
                response = userList.error;
                console.error(response);
            } else {
                response = userList.list;
            }
        } catch (error) {
            return console.error('An error occurred while showing the list:', error.message);
        }
        console.log(response);
        return response;
    };

    static getUser = async (userID) => {
        let response;
        try {
            const user = await readUser(userID);
            if (!user.status) {
                response = userList.error;
                console.error(response);
            } else {
                response = user.user;
            }
            return response;
        } catch (error) {
            return console.error('An error occurred while showing the user:', error.message);
        }
    };

    static updateUser = async (userID, updatedUser) => {
        let response;
        try {
            // Read the existing tasks
            const user = await readUser(userID);
            if (!user.status) {
                response = user.error;
                console.error(response);
            } else {
                Object.keys(user.user).forEach((userKey) => {
                    if (updatedUser[userKey] && userKey === 'recievedDate') {
                        return;
                    } else if (updatedUser[userKey]) {
                        user.user[userKey] = updatedUser[userKey];
                    }
                });

                response = {
                    updatedUser: user.user
                };
            }
            writeUser(userID, user.user);
            console.log(response);
        } catch(error) {
        console.error('An error occurred while updating the task:', error.message);
    }
        return response;
    };

    static deleteUser = async (userID) => {
        let response;
        try {
            const user = await readUser(userID);
            if (!user.status) {
                response = user.error;
                console.error(response);
            } else {
                response = {
                    deletedUser: user.user
                };
                await db.dbUsers().deleteOne(
                    { userID }
                )
            }
        } catch (error) {
            console.error('An error occurred while deleting the task:', error.message);
        }
        return response;
    };
};