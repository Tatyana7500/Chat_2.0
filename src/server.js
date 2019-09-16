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

const chatDal = new ChatDAL();
chatDal.initialize();

const clients = [];

io.sockets.on('connection', socket => {
    const user = JSON.parse(socket.handshake.query.user);
    clients.push({
        ...user,
        socketId: socket.id,
    });

    io.sockets.emit(constants.ONLINE, clients.map(client => client.id));

    socket.on(constants.MESSAGE, handleMessage);
    socket.on(constants.DISCONNECT, () => handleDisconnect(socket));
});

async function handleDisconnect(socket) {
    const client = clients.find(item => item.socketId === socket.id);
    const index = clients.indexOf(client);

    if (index > -1) {
        clients.splice(index, 1);
        io.sockets.emit(constants.ONLINE, clients.map(client => client.id));
    }
}

async function handleMessage(message) {
    await chatDal.createMessage(message);
    const { receiver } = message;
    const { name, email, id } = await chatDal.readUserById(message.sender);

    const oneMessage = {
        message: message.message,
        date: message.date,
        name,
        email,
    };

    if (receiver === 'ALL') {
        io.sockets.emit(constants.MESSAGE, oneMessage);
    } else {
        const socketIds = clients.filter(item => item.id === id || item.id === receiver)
            .map(client => client.socketId);

        for(let socketId of socketIds) {
            const socket = io.sockets.connected[socketId];
            socket && socket.emit(constants.MESSAGE, oneMessage);
        }
    }


}

app.post('/message', jsonParser, async (request, res) => {
    await chatDal.createMessage(request.body);
    io.sockets.emit(constants.MESSAGE, request.body);

    res.status(200).send('OK');
});

app.post('/auth', jsonParser, async (request, res) => {
    try {
        const {email, password} = request.body;
        const user = await chatDal.readUser(email, password);
        res.status(200).send(user);
    } catch (e) {
        res.status(403).send(e.message);
    }
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

    res.status(200).send(users);
});

app.get('/messages', async (request, res) => {
    const {sender, receiver, chat} = request.query;
    let users = await  chatDal.readAllUsers();
    let messages = [];

    if (chat === 'PUBLIC') {
        messages = await chatDal.readPublicMessages();
    } else if (chat === "PRIVATE"){
        messages = await chatDal.readPrivateMessages(sender, receiver);
    }

    res.status(200).send(chatDal.mergeMessageAndUser(messages, users));
});