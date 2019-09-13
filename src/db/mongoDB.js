const mongoose = require("mongoose");
const autoIncrement = require('mongoose-auto-increment');

const connection = mongoose.createConnection("mongodb://localhost/");
autoIncrement.initialize(connection);

const Schema = mongoose.Schema;

const userScheme = new Schema({
    id: { type: Number},
    name: String,
    email: String,
    password: String,
    versionKey: false
});

const messageScheme = new Schema({
    id: { type: Number},
    message: String,
    sender: Number,
    receiver: Number,
    date: Date,
    versionKey: false
});

userScheme.plugin(autoIncrement.plugin, 'User');
messageScheme .plugin(autoIncrement.plugin, 'Message');

module.exports = mongoose.model("User", userScheme);
module.exports = mongoose.model("Message", messageScheme);