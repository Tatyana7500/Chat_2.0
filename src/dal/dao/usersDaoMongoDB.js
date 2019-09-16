const DAO = require('./dao');
const config = require('../../config');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
});

function UsersDaoMongoDB() {
    this.connection = null;
    this.model = null;
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
            this.model = connection.model('user', userSchema);
        })
        .catch((error) => {
            console.error(error);
        });
};

UsersDaoMongoDB.prototype.create = async function (object) {
    const user = this.model(object);
    await user.save();
};

UsersDaoMongoDB.prototype.readAll = async function() {
     const data = await this.model.find({});
     return data.map(item => ({
         ...item._doc,
         id: item._id.toString(),
     }));
};

UsersDaoMongoDB.prototype.readUser = async function(email, password) {
    const data = await this.model.findOne({ email, password });
    return {
        ...data._doc,
        id: data._id.toString(),
    };
};

UsersDaoMongoDB.prototype.readUserById = async function(id) {
    const data = await this.model.findOne({ _id: id });
    return {
        ...data._doc,
        id: data._id.toString(),
    };
};

module.exports = UsersDaoMongoDB;