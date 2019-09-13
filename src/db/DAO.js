function DAO() {
}
DAO.prototype.initialize = function() {
    throw new Error('not implemented method');
};
DAO.prototype.readAll = function() {
    throw new Error('not implemented method');
};
DAO.prototype.create = function (object) {
    throw new Error('not implemented method');
};

function MongoDBMessagesDAO() {
}
MongoDBMessagesDAO.prototype = Object.create(DAO.prototype);
MongoDBMessagesDAO.prototype.constructor = MongoDBMessagesDAO;

function PostgresMessagesDAO() {
}
PostgresMessagesDAO.prototype = Object.create(DAO.prototype);
PostgresMessagesDAO.prototype.constructor = PostgresMessagesDAO;

function MongoDBUsersDAO() {
}
MongoDBUsersDAO.prototype = Object.create(DAO.prototype);
MongoDBUsersDAO.prototype.constructor = MongoDBUsersDAO;

function PostgresUsersDAO() {
}
PostgresUsersDAO.prototype = Object.create(DAO.prototype);
PostgresUsersDAO.prototype.constructor = PostgresUsersDAO;

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
ChatDAL.prototype.createMessagesDAO = function(databaseType) {
    switch (databaseType) {
        case constants.MONGO:
            return new MongoDBMessagesDAO();
        case constants.POSTGRES:
            return new PostgresMessagesDAO();
        default:
            throw new Error('unknown databaseType');
    }
};
ChatDAL.prototype.createUsersDAO = function(databaseType) {
    switch (databaseType) {
        case constants.MONGO:
            return new MongoDBUsersDAO();
        case constants.POSTGRES:
            return new PostgresUsersDAO();
        default:
            throw new Error('unknown databaseType');
    }
};
ChatDAL.prototype.readAllMessages = function () {
    return this.messagesDAO.readAll();
};
ChatDAL.prototype.createMessage = function (message) {
    this.messagesDAO.create(message);
};
ChatDAL.prototype.readAllUsers = function () {
    return this.usersDAO.readAll()
};
ChatDAL.prototype.createUser = function (user) {
    this.usersDAO.create(user);
};