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
        window.location.href = '/login/login.html';
    });

    this.init = () => {
        loader();
        const userData = localStorage.getItem('chat');

        if (userData) {
            const user = JSON.parse(userData);
            idUserSender = user._id;
            _view.drawDataUser(user);
            _model.getUsers(_view.drawInitUsers);
        } else {
            window.location.href = '/login/login.html';
        }

        _model.onlineUser(idUserSender);

        this.socket.on(idUserSender, (message) => {
            if (idUserReceiver !== "ALL") {
                _model._messages.push(message);
                _view.drawInitMassage(_model._messages)
            }
        });

        this.socket.on(idUserReceiver, (message) => {
            if (idUserReceiver !== "ALL") {
                _model._messages.push(message);
                _view.drawInitMassage(_model._messages)
            }
        })
    };

    _view.content.addEventListener('click', addListener);

    function addListener(event) {
        if (event.target.className === 'btn footer__send') {
            const message = getMessageData();
            _model.addMessages(message);
        } else if (event.target.className === 'users__info') {
            idUserReceiver = event.target.parentNode.id;
            _model.getMessages(_view.drawInitMassage, "PRIVATE", idUserSender, idUserReceiver);

        }
    }

    function getMessageData() {
        return new Messages(_view.inputMessage.value, idUserSender, idUserReceiver, new Date().getTime());
    }

    this.socket.on('online', (idOnline) => {
        _view.onlineDraw(idOnline);
    });

    this.socket.on('offline', (idOffline) => {
        _view.offlineDraw(idOffline);
    });

    this.socket.on('message', (message) => {
        if (idUserReceiver === "ALL") {
            _model._messages.push(message);
            _view.drawInitMassage(_model._messages)
        }
    });

    function loadData() {
        console.log(_view.loader);
        return new Promise((resolve, reject) => {
            setTimeout(resolve, 1000);
        })
    }

    function loader() {
        console.log(_view.loader);
        loadData()
            .then(() => {
                _view.loader.classList.add('hidden');
                _view.loader.classList.remove('visible');
            });
    }
};