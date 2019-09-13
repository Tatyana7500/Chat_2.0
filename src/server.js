const socket = require('socket.io');
const mongoose = require("mongoose");
const express = require('express');
const bodyParser = require("body-parser");
const constants = require('./constants');
const Schema = mongoose.Schema;
const jsonParser = bodyParser.json();

const app = express();
app.use(express.static('public'));
app.use(express.static('login'));
app.use(express.static('signin'));
app.use(express.static('main'));
app.use(express.static('src'));
app.use(express.json());

const server = app.listen(3001);
const io = socket(server);

const userScheme = new Schema({
    name: String,
    email: String,
    password: String,
});

const messageScheme = new Schema({
    message: String,
    sender: String,
    receiver: Number,
    date: Date,
});

const UserDB = mongoose.model("User", userScheme);
const MessageDB = mongoose.model("Message", messageScheme);

io.sockets.on('connection', handleConnection);

function handleConnection(socket) {
    console.log("connect yes");
    socket.on(constants.MESSAGE, handleMessage);
}

function handleMessage(messageOne) {
    switch (messageOne.type) {
        case constants.MESSAGE: {
            const message = new MessageDB({
                sender: messageOne.email,
                date: messageOne.date,
                message:messageOne.message
            });

            message.save()
                .then(function (doc) {
                    console.log("Сохранен объект", doc);
                })
                .catch(function (err) {
                    console.log(err);
                });

            messages.push(messageOne);
            io.sockets.emit(constants.MESSAGE, messageOne);
        }
            break;
        default:
            console.log('unknown message type');
    }
}

const User = function (name, email, password) {
    this.name = name;
    this.email = email;
    this.password = password;
};

const users = [
    { name: 'kat', email: 'vasia@gmail.com', password: '123abc'},
    { name: 'kat', email: 'patya@gmail.com', password: '453'},
    { name: 'kat', email: 'masha@gmail.com', password: 'ggggg'},
];

const messages=[
    { date: '15.02.2019', email: 'vasia@gmail.com', message: 'rrr', name: 'kat'},
    { date: '19.05.2019', email: 'patya@gmail.com', message: '555', name: 'kat'},
    { date: '23.02.2017', email: 'masha@gmail.com', message: '6ggdg', name: 'kat'},
];

const DB = {
    findByEmail: function (email) {
        return users.find(value => value.email === email)
    }
};

app.post('/auth', jsonParser, function(request, res) {
    if (!request.body.email || !request.body.password) {
        res.status(401).send('Please pass email and password.')
    } else {
        let found = DB.findByEmail(request.body.email);
        if (found && found.password === request.body.password) {
            res.status(200).send(request.body);
        } else {
            res.status(400).send("User not exist or password not correct");
        }
    }
});

app.post('/signin', jsonParser, function(request, res) {

    if (!request.body.email || !request.body.name || !request.body.password) {
        res.status(401).send('Please pass email and password.');
    } else {
        res.status(201).send("User added");
        const user = new UserDB({
            name: request.body.name,
            email: request.body.email,
            password: request.body.password
        });

        user.save()
            .then(function (doc) {
                console.log("Сохранен объект", doc);
            })
            .catch(function (err) {
                console.log(err);
            });

        users.push(user);
    }
});

app.get('/users', function(request, res) {
    res.status(200).send(users);
});

app.get('/messages', function(request, res) {
    res.status(200).send(messages);
});

mongoose.connect('mongodb://localhost/27017', { useNewUrlParser: true, useUnifiedTopology: true});
let db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log( `we're connected!`);
});