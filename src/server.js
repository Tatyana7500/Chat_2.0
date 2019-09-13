const socket = require('socket.io');
const express = require('express');
const bodyParser = require("body-parser");
const constants = require('./constants');
const ChatDAL = require('./dal/chatDAL');
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

io.sockets.on('connection', handleConnection);

const chatDal = new ChatDAL();
chatDal.initialize();

function handleConnection(socket) {
    console.log("connect yes");
    socket.on(constants.MESSAGE, handleMessage);
}

function handleMessage(message) {
    switch (message.type) {
        case constants.MESSAGE:
            io.sockets.emit(constants.MESSAGE, message);
            break;
        default:
            console.log('unknown message type');
    }
}

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

app.post('/auth', jsonParser, async (request, res) => {
    const user = await chatDal.read(request.body);
    res.status(200).send(user);
});

app.post('/signin', jsonParser, async (request, res) => {
    try {
        await chatDal.createUser(request.body);
        res.status(200).send('OK');
    } catch (e) {
        res.status(409).send(e.message);
    }
});

app.get('/users', async (request, res) => {
    const users = await chatDal.readAllUsers();
    console.log('readAllUser', users);
    res.status(200).send(users);
});

app.get('/messages', async (request, res) => {
    res.status(200).send(messages);
});
