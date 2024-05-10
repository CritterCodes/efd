export default class User {
    constructor (userID, firstName, lastName, username, email, password, phoneNumber, accountType) {
        this.userID = userID;
        this.firstName = firstName;
        this.lastName = lastName;
        this.username = username;
        this.email = email;
        this.password = password;
        this.phoneNumber = phoneNumber;
        this.accountType = accountType;
    }
}