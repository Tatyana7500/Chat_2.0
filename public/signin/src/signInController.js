function SignInController(view) {
    this.view = view;
}

SignInController.prototype.init = function() {
    this.view.init();
    this.addEventListeners();
};

SignInController.prototype.getAuthData = function() {
    const { value: name } = this.view.singInNameInput;
    const { value: email } = this.view.sinInEmailInput;
    const { value: password } = this.view.singInPasswordInput;

    return { name, email, password };
};

SignInController.prototype.addEventListeners = function () {
    this.view.singIn.addEventListener('click', event => {
        const { value: password } = this.view.singInPasswordInput;
        const { value: confirm } = this.view.singInComfirmPasswordInput;

        if (password === confirm) {
            const data = this.getAuthData();
            RequestSender.sendPOSTRequest('/signin', data,
                    resp => this.view.handleAuthSuccess(resp),
                    error => this.view.handleAuthError(error));
        } else {
            this.view.handleAuthError("Password not coincidence");
        }
    });
};