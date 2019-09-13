const constants = require('../constants');
const UsersDaoMongoDB = require('./dao/usersDaoMongoDB');
const MessagesDaoMongoDB = require('./dao/messagesDaoMongoDB');
const config = require('../config');

function ChatDAL() {
    this.messagesDAO = null;
    this.usersDAO = null;
}
ChatDAL.prototype.initialize = function () {
    this.messagesDAO = this.createMessagesDAO();
    this.messagesDAO.initialize();

    this.usersDAO = this.createUsersDAO();
    this.usersDAO.initialize();
};
ChatDAL.prototype.createMessagesDAO = function() {
    switch (config.databaseType) {
        case constants.MONGO:
            return new MessagesDaoMongoDB();
        default:
            throw new Error('unknown databaseType');
    }
};
ChatDAL.prototype.createUsersDAO = function() {
    switch (config.databaseType) {
        case constants.MONGO:
            return new UsersDaoMongoDB();
        default:
            throw new Error('unknown databaseType');
    }
};
ChatDAL.prototype.readAllMessages = async function () {
    return await this.messagesDAO.readAll();
};
ChatDAL.prototype.createMessage = async function (message) {
    await this.messageDAO.create(message);
};
ChatDAL.prototype.readAllUsers = async function () {
    return await this.usersDAO.readAll()
};
ChatDAL.prototype.createUser = async function (user) {
    await this.usersDAO.create(user);
};
ChatDAL.prototype.read = async function (user) {
    return await this.usersDAO.read(user);
};

module.exports = ChatDAL;