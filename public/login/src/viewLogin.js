const LoginView = function () {

    this.emailInput = document.getElementById("loginPageEmailInput");
    this.passwordInput = document.getElementById("loginPagePasswordInput");
    this.modalBackground = document.getElementById("modalBackground");
    this.modalWindow = document.getElementById("modalWindow");
    this.close = document.getElementById("close");
    this.textErr = document.getElementById("typeText");
    this.auth = document.getElementById("enterAccount");

    this.handleAuthError = (errType) => {
        this.modalBackground.classList.toggle("visible");
        this.modalWindow.classList.toggle("visible");
        this.textErr.innerHTML = errType;

        this.close.onclick = () => {
            this.modalBackground.classList.toggle("visible");
            this.modalWindow.classList.toggle("visible");
        };
    };

    this.handleAuthSuccess = (data) => {
        window.location.href = '/main/main.html';
    }
};