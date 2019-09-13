const MainView = function () {

    this.accountName = document.getElementsByClassName("info__name")[0];
    this.accountEmail = document.getElementsByClassName("info__email")[0];
    this.logOut = document.getElementById("logOut");
    this.users = document.getElementById("getUsers");
    this.chat = document.getElementById("getChat");
    this.content = document.getElementsByClassName("content")[0];
    this.sendMessage = "";
    this.inputMessage = "";
    this.messageField = "";

    this.drawAllUsers = (users) => {
        for (let i = 0; i < users.length; i++) {
            this.content.innerHTML += `<div class="users__card"><p class="users__info">${users[i].name}</p><p class="users__info">${users[i].email}</p></div>`;
        }
    };

    this.usersInit = () => {
        const drawUsers = `<div class="users__title"><div class="users__info">name</div><div class="users__info">e-mail</div></div>`;
        this.content.innerHTML = drawUsers;
    };

    this.chatInit = () => {
        const drawChat = `<div class="massageField"></div><div class="footer"><textarea class="textMassage" placeholder="Your massage"></textarea><button id="footer__send" class="btn footer__send">Send</button></div>`;

        this.content.innerHTML = drawChat;
        this.sendMessage = document.getElementsByClassName("footer__send")[0];
        this.inputMessage = document.getElementsByClassName("textMassage")[0];

    };

    this.drawAllMessages = (messages) => {
        this.messageField = document.getElementsByClassName("massageField")[0];
        for (let i = 0; i < messages.length; i++) {
            this.messageField.innerHTML += `<div class="massage"><p class="massage__name">${messages[i].name}</p><p class="massage__email">${messages[i].email}</p><span class="massage__text">${messages[i].message}</span><p class="massage__time">${messages[i].date}</p></div>`;
        }
    };

    this.reset = () => {
        while (this.content.firstChild) {
            this.content.removeChild(this.content.firstChild)
        }
    };

    this.drawInitMassage = (messages) => {
        this.reset();
        this.chatInit();
        this.drawAllMessages(messages);
    };

    this.drawInitUsers = (users) => {
        this.reset();
        this.usersInit();
        this.drawAllUsers(users);
    };

    this.drawDataUser = (user) => {
        console.log(user);
        //this.accountName.innerHTML = user.name;
        this.accountEmail.innerHTML = user.email;
    };

    this.goToLoginPage = () => {
        window.location.href = '/login/login.html';
    };
};