export default class Repair {
    constructor(repairID, userID, description, picture, recievedDate, promiseDate, metalType, repairTasks) {
        this.repairID = repairID;
        this.userID = userID;
        this.description = description;
        this.picture = picture;
        this.recievedDate = recievedDate;
        this.promiseDate = promiseDate;
        this.metalType = metalType;
        this.repairTasks = repairTasks;
    }
}