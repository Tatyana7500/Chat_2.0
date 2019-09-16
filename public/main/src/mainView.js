const MainView = function () {
    this.accountName = null;
    this.accountEmail = null;
    this.logOut = null;
    this.users = null;
    this.chat = null;
    this.content = null;
    this.sendMessage = null;
    this.inputMessage = null;
    this.messageField = null;
};

MainView.prototype.drawAllUsers = function(users){
    for (let i = 0; i < users.length; i++) {
        this.content.innerHTML += `<div class="users__card" id="${users[i]._id}">
                <p class="users__info">${users[i].name}</p>
                <p class="users__info">${users[i].email}</p>
            </div>`;
    }
};

MainView.prototype.usersInit = function() {
    const drawUsers = `<div class="users__title"><div class="users__info">name</div><div class="users__info">e-mail</div></div>`;
    this.content.innerHTML = drawUsers;
};

MainView.prototype.chatInit = function(){
    const drawChat = `<div class="massageField"></div><div class="footer"><textarea class="textMassage" placeholder="Your massage"></textarea><button id="footer__send" class="btn footer__send">Send</button></div>`;

    this.content.innerHTML = drawChat;
    this.sendMessage = document.getElementsByClassName("footer__send")[0];
    this.inputMessage = document.getElementsByClassName("textMassage")[0];
};

MainView.prototype.drawAllMessages = function(messages){
    this.messageField = document.getElementsByClassName("massageField")[0];
    for (let i = 0; i < messages.length; i++) {
        const date = new Date(messages[i].date).toTimeString().slice(0, 8);
        this.messageField.innerHTML += `<div class="massage"><p class="massage__name">${messages[i].name}</p><p class="massage__email">${messages[i].email}</p><span class="massage__text">${messages[i].message}</span><p class="massage__time">${date}</p></div>`;
    }
};

MainView.prototype.reset = function() {
    while (this.content.firstChild) {
        this.content.removeChild(this.content.firstChild)
    }
};

MainView.prototype.drawInitMassage = function(messages) {
    this.reset();
    this.chatInit();
    this.drawAllMessages(messages);
};

MainView.prototype.drawInitUsers = function(users, online) {
    this.reset();
    this.usersInit();
    this.drawAllUsers(users, online);
};

MainView.prototype.drawDataUser = function(user) {
    this.accountName.innerHTML = user.name;
    this.accountEmail.innerHTML = user.email;
};

MainView.prototype.onlineDraw = function(online) {
    const cards = document.querySelectorAll('.users__card');
    cards.forEach(card => {
        card.style.backgroundColor = online.includes(card.id) ? "#000000" : "#cccccc";
    });
};

MainView.prototype.init = function () {
    this.accountName = document.getElementsByClassName("info__name")[0];
    this.accountEmail = document.getElementsByClassName("info__email")[0];
    this.logOut = document.getElementById("logOut");
    this.users = document.getElementById("getUsers");
    this.chat = document.getElementById("getChat");
    this.content = document.getElementsByClassName("content")[0];
};