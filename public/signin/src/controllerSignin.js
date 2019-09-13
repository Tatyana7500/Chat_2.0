const SignInController = function (view) {
    const _view = view;

    _view.singIn.addEventListener('click', event => {
        if (_view.singInPasswordInput.value == _view.singInComfirmPasswordInput.value) {
            const data = getAuthData();
            sendPostRequest('/signin', data, _view.handleAuthSuccess, _view.handleAuthError);
        } else _view.handleAuthError("Password not coincidence");
    });

    function getAuthData() {
        return new Users (_view.singInNameInput.value, _view.sinInEmailInput.value, _view.singInPasswordInput.value);
    }

    function sendPostRequest(url, data, onSuccess, onError) {
        const xhr = new XMLHttpRequest();

        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4) {
                if (xhr.status === 201) {
                    console.log(xhr.responseText);
                    onSuccess(xhr.responseText);
                } else {
                    onError(xhr.responseText);
                }
            }
        };

        xhr.open('POST', url, false);
        xhr.setRequestHeader("Content-type", "application/json");
        xhr.send(JSON.stringify(data));
    }
};