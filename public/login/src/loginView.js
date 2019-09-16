const LoginView = function () {
};

LoginView.prototype.init = function () {
    this.emailInput = document.getElementById("loginPageEmailInput");
    this.passwordInput = document.getElementById("loginPagePasswordInput");
    this.modalBackground = document.getElementById("modalBackground");
    this.modalWindow = document.getElementById("modalWindow");
    this.close = document.getElementById("close");
    this.textErr = document.getElementById("typeText");
    this.auth = document.getElementById("enterAccount");
};

LoginView.prototype.drawErrorMessage = function (errorType) {
    this.modalBackground.classList.toggle("visible");
    this.modalWindow.classList.toggle("visible");
    this.textErr.innerHTML = errorType;

    this.close.onclick = () => {
        this.modalBackground.classList.toggle("visible");
        this.modalWindow.classList.toggle("visible");
    };
};