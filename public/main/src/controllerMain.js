const MainController = function (model, view) {
    const _view = view;
    const _model = model;

    _view.users.addEventListener('click', event => {
        _model.getUsers(_view.drawInitUsers);
    });

    _view.chat.addEventListener('click', event => {
        _model.getMessages(_view.drawInitMassage);
    });

    _view.logOut.addEventListener('click', event => {
        localStorage.removeItem('chat');
        _view.goToLoginPage();
    });

    this.init = () => {
        const user = localStorage.getItem('chat');

        if (user) {
            _view.drawDataUser(JSON.parse(user));
            _model.getUsers(_view.drawInitUsers);
        } else {
            _view.goToLoginPage();
        }
    };

    function getMessageData() {
        return new Messages(_view.inputMessage.value, "kolya", "ALL", 100);
    }

    _view.content.addEventListener('click',  addListener);

    function addListener (event) {
        if (event.target.className === 'btn footer__send') {
            const message = getMessageData();
            _model.addMessages(message);

            setTimeout(() => {
                _view.drawInitMassage(_model._messages);
            }, 50);
        }
    }
};