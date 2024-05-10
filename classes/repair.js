export default class Repair {
    constructor(repairID, user, description, picture, recievedDate, promiseDate, metalType, repairTasks) {
        this.repairID = repairID;
        this.user = user;
        this.description = description;
        this.picture = picture;
        this.recievedDate = recievedDate;
        this.promiseDate = promiseDate;
        this.metalType = metalType;
        this.repairTasks = repairTasks;
    }
}