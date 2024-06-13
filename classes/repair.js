export default class Repair {
    constructor(repairID, userID, description, picture, receivedDate, promiseDate, metalType, repairTasks, status) {
        this.repairID = repairID;
        this.userID = userID;
        this.description = description;
        this.picture = picture;
        this.receivedDate = receivedDate;
        this.promiseDate = promiseDate;
        this.metalType = metalType;
        this.repairTasks = repairTasks;
        this.status = status;
    }
}