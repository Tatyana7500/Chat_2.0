const SignInView = function () {
    this.sinInEmailInput = null;
    this.singInNameInput = null;
    this.singInPasswordInput = null;
    this.singInComfirmPasswordInput = null;
    this.singIn = null;
    this.modalBackground = null;
    this.modalWindow = null;
    this.close = null;
    this.textErr = null;
};

SignInView.prototype.init = function () {
    this.sinInEmailInput = document.getElementById("singinPageEmailInput");
    this.singInNameInput = document.getElementById("singinPageNameInput");
    this.singInPasswordInput = document.getElementById("singinPagePasswordInput");
    this.singInComfirmPasswordInput = document.getElementById("singinPageComfirmPasswordInput");
    this.singIn = document.getElementById("regAccount");
    this.modalBackground = document.getElementById("modalBackground");
    this.modalWindow = document.getElementById("modalWindow");
    this.close = document.getElementById("close");
    this.textErr = document.getElementById("typeText");
};

SignInView.prototype.handleAuthSuccess = function () {
    window.location.href = '/login/login.html';
};

SignInView.prototype.handleAuthError = function (errorType) {
    this.modalBackground.classList.toggle("visible");
    this.modalWindow.classList.toggle("visible");
    this.textErr.innerHTML = errorType;

    this.close.onclick = () => {
        this.modalBackground.classList.toggle("visible");
        this.modalWindow.classList.toggle("visible");
    }
};