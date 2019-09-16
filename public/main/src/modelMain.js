const MainModel = function () {
    this._users = [];
    this._messages = [];
    this.socket = io.connect('http://localhost:3001/');
    const xhr = new XMLHttpRequest();

    this.getUsers = (onGetMessagesSuccess) => {
        sendGETRequest('/users', data => {
            this._users = JSON.parse(data);
            onGetMessagesSuccess(this._users);
            this.online();
        });
    };

    this.getMessages = (onGetMessagesSuccess, chat, sender, receiver) => {
        const url = `/messages?chat=${chat}&sender=${sender}&receiver=${receiver}`;
        sendGETRequest(url, data => {
            this._messages = JSON.parse(data);
            onGetMessagesSuccess(this._messages);
        });
    };

    this.onlineUser = (id) => {
        this.socket.emit('online', id);
    };

    this.online = () => {
        this.socket.emit('online');
    };

    this.addMessages = (message) => {
        this.socket.emit('message', message);
    };

    async function sendGETRequest(url, callback) {

        xhr.open('GET', url, true);
        xhr.setRequestHeader("Content-type", "application/json");

        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                callback(xhr.responseText);
            }
        };

        xhr.send();
    }
};