const MainController = function (model, view) {
    const _view = view;
    const _model = model;
    let idUserSender = "";
    let idUserReceiver = "ALL";
    this.socket = io.connect('http://localhost:3001/');


    _view.users.addEventListener('click', event => {
        _model.getUsers(_view.drawInitUsers);
    });

    _view.chat.addEventListener('click', event => {
        idUserReceiver = "ALL";
        _model.getMessages(_view.drawInitMassage, "PUBLIC", idUserSender, idUserReceiver);
    });

    _view.logOut.addEventListener('click', event => {
        localStorage.removeItem('chat');
        _view.goToLoginPage();
    });

    this.init = () => {
        const user = JSON.parse(localStorage.getItem('chat'));

        if (user) {
            idUserSender = user._id;
            _view.drawDataUser(user);
            _model.getUsers(_view.drawInitUsers);
        } else {
            _view.goToLoginPage();
        }

        _model.onlineUser(idUserSender);
    };

    function getMessageData() {
        return new Messages(_view.inputMessage.value, idUserSender, idUserReceiver, new Date().getTime());
    }

    _view.content.addEventListener('click',  addListener);

    function addListener (event) {
        if (event.target.className === 'btn footer__send') {
            const message = getMessageData();
            _model.addMessages(message);

            setTimeout(() => {
                _view.drawInitMassage(_model._messages);
            }, 50);
        } else if(event.target.className === 'users__info') {
            idUserReceiver = event.target.parentNode.id;
            _model.getMessages(_view.drawInitMassage, "PRIVATE", idUserSender, idUserReceiver);
        }
    }

    this.socket.on('online', (idOnline) => {
        _view.onlineDraw(idOnline);
    });

    this.socket.on('offline', (idOffline) => {
        _view.offlineDraw(idOffline);
    });

    this.socket.on('message', (message) => {
        _model._messages.push(message);
        _view.drawInitMassage(_model._messages)
    })
};