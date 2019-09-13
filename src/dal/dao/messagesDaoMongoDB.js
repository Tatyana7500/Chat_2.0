const DAO = require('./dao');

function MessagesDaoMongoDB() {
}

MessagesDaoMongoDB.prototype = Object.create(DAO.prototype);
MessagesDaoMongoDB.prototype.constructor = MessagesDaoMongoDB;

MessagesDaoMongoDB.prototype.initialize = function () {
    console.log('messagesDao initialized');
};

module.exports = MessagesDaoMongoDB;