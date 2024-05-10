export default class Ticket {
    constructor (ticketID, user, date, repairs) {
        this.ticketID = ticketID;
        this.user = user;
        this.date = date;
        this.repairs = repairs;
    }
}