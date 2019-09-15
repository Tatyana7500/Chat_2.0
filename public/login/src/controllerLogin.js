const LoginController = function (view) {
    const _view = view;

    _view.auth.addEventListener(`click`, () => {
        const data = getAuthData();
        sendPostRequest('/auth', data, _view.handleAuthSuccess, _view.handleAuthError);
    });

    function getAuthData() {
        return {
            email: _view.emailInput.value,
            password: _view.passwordInput.value,
        };
    }

    function sendPostRequest(url, data, onSuccess, onError) {
        const xhr = new XMLHttpRequest();

        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    onSuccess(xhr.responseText);
                } else {
                    onError(xhr.responseText);
                }
            }
        };

        xhr.open('POST', url, true);
        xhr.setRequestHeader("Content-type", "application/json");
        xhr.send(JSON.stringify(data));
    }
};