function LoginController(view) {
    this.view = view;
}

LoginController.prototype.init = function() {
    this.view.init();
    this.addEventListeners();
};

LoginController.prototype.addEventListeners = function () {
    this.view.auth.addEventListener(`click`, () => {
        const data = this.getAuthData();
        RequestSender.sendPOSTRequest('/auth', data, this.handleAuthSuccess, this.handleAuthError);
    });
};

LoginController.prototype.getAuthData = function() {
    return {
        email: this.view.emailInput.value,
        password: this.view.passwordInput.value,
    };
};

LoginController.prototype.handleAuthError = function(errorType){
    this.view.drawErrorMessage(errorType);
};

LoginController.prototype.handleAuthSuccess = function(data) {
    localStorage.setItem("chat", data);
    window.location.href = '/main/main.html';
};
