const Messages = function (name, email, message, date, sender, receiver) {
    this.name = name;
    this.email = email;
    this.message = message;
    this.date = date;
    this.sender = sender;
    this.receiver = receiver;
    this.type = "message";
};