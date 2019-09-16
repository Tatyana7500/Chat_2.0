function MainController(model, view) {
    this.view = view;
    this.model = model;
    this.socket = null;
}

MainController.prototype.getMessageData = function () {
    const { value: message } = this.view.inputMessage;

    return {
        message,
        date: new Date().getTime(),
        sender: this.model.user.id,
        receiver: this.model.receiverId,
    };
};

MainController.prototype.addListeners = function () {
    this.view.content.addEventListener('click', event => {
        if (event.target.className === 'btn footer__send') {
            const message = this.getMessageData();
            this.sendMessage(message);
        } else if (event.target.className === 'users__info') {
            this.model.receiverId = event.target.parentNode.id;
            this.getMessages(
                messages => this.view.drawInitMassage(messages),
                "PRIVATE",
                this.model.user.id,
                this.model.receiverId
            );
        }
    });

    this.view.users.addEventListener('click', () => {
        this.getUsers(users => {
            this.view.drawInitUsers(this.model.users);
            this.view.onlineDraw(this.model.online);
        });
    });

    this.view.chat.addEventListener('click', () => {
        this.model.receiverId = "ALL";
        this.getMessages(
            messages => this.view.drawInitMassage(messages),
            "PUBLIC",
            this.model.user.id,
            this.model.receiverId
        );
    });

    this.view.logOut.addEventListener('click', () => {
        localStorage.removeItem('chat');
        this.goToLoginPage();
    });
};

MainController.prototype.init = function () {
    const userData = localStorage.getItem('chat');

    if (userData) {
        this.view.init();
        this.model.user = JSON.parse(userData);
        this.view.drawDataUser(this.model.user);
        this.getUsers(users => {
            this.view.drawInitUsers(users);
            this.view.onlineDraw(this.model.online);
        });
        this.connectWebSocket();
        this.addListeners();
    } else {
        this.goToLoginPage();
    }
};

MainController.prototype.sendMessage = function(message) {
    this.socket.emit('message', message);
};

MainController.prototype.goToLoginPage = function() {
    window.location.href = '/login/login.html';
};

MainController.prototype.connectWebSocket = function () {
    if (this.socket) {
        return;
    }

    this.socket = io.connect('http://localhost:3001/',
        {query: `user=${JSON.stringify(this.model.user)}`});

    this.socket.on('online', online => {
        this.model.online = online;
        this.view.onlineDraw(online);
    });

    this.socket.on('message', (message) => {
        this.model.messages.push(message);
        this.view.drawInitMassage(this.model.messages)
    });
};

MainController.prototype.getUsers = function(onGetMessagesSuccess) {
    RequestSender.sendGETRequest('/users', data => {
        this.model.users = JSON.parse(data);
        onGetMessagesSuccess(this.model.users);
    });
};

MainController.prototype.getMessages = function(onGetMessagesSuccess, chat, sender, receiver) {
    const url = `/messages?chat=${chat}&sender=${sender}&receiver=${receiver}`;
    RequestSender.sendGETRequest(url, data => {
        this.model.messages = JSON.parse(data);
        onGetMessagesSuccess(this.model.messages);
    });
};