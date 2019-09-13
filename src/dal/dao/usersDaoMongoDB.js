const DAO = require('./dao');
const config = require('../../config');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
});

let User;

function UsersDaoMongoDB() {
    this.connection = null;
}

UsersDaoMongoDB.prototype = Object.create(DAO.prototype);
UsersDaoMongoDB.prototype.constructor = UsersDaoMongoDB;

UsersDaoMongoDB.prototype.initialize = function () {
    if (this.connection) {
        return;
    }

    const url = `${config.settings.mongo.connectionString}/chatDB`;

    mongoose.createConnection(url)
        .then(connection => {
            this.connection = connection;
            User = connection.model('user', userSchema);
        })
        .catch((error) => {
            console.log(error);
        });
};

UsersDaoMongoDB.prototype.create = async function (object) {
    const user = new User(object);
    await user.save();
    console.log('saved', user);
};

UsersDaoMongoDB.prototype.readAll = async function() {
     return await User.find({});
};

UsersDaoMongoDB.prototype.read = async function({ email, password }) {
    return await User.find({ email, password });
};

module.exports = UsersDaoMongoDB;