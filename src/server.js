const socket = require('socket.io');
const express = require('express');
const bodyParser = require("body-parser");
const constants = require('./constants');
const ChatDAL = require('./dal/chatDAL');
const jsonParser = bodyParser.json();

const app = express();
app.use(express.static('public'));
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

async function handleMessage(message) {
    await chatDal.createMessage(message);
    io.sockets.emit(constants.MESSAGE, message);
    console.log("message handle", message);
}

app.post('/message', jsonParser, async (request, res) => {
    await chatDal.createMessage(request.body);
    io.sockets.emit(constants.MESSAGE, request.body);
    console.log("message handle", request.body);
    res.status(200).send('OK');
});

app.post('/auth', jsonParser, async (request, res) => {
    const {email, password} = request.body;
    console.log(email, password);
    const user = await chatDal.readUser(email, password);
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
    const {sender, receiver, chat} = request.query;
    console.log(sender, receiver, chat);
    let messages = [];

    if (chat === 'PUBLIC') {
        messages = await chatDal.readPublicMessages();
    } else if (chat === "PRIVATE"){
        messages = await chatDal.readPrivateMessages(sender, receiver);
    }

    res.status(200).send(messages);
});