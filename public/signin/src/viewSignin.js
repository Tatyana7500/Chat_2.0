const SignInView = function () {

    this.sinInEmailInput = document.getElementById("singinPageEmailInput");
    this.singInNameInput = document.getElementById("singinPageNameInput");
    this.singInPasswordInput = document.getElementById("singinPagePasswordInput");
    this.singInComfirmPasswordInput = document.getElementById("singinPageComfirmPasswordInput");
    this.singIn = document.getElementById("regAccount");
    this.modalBackground = document.getElementById("modalBackground");
    this.modalWindow = document.getElementById("modalWindow");
    this.close = document.getElementById("close");
    this.textErr = document.getElementById("typeText");

    this.handleAuthError = (errType) => {
        this.modalBackground.classList.toggle("visible");
        this.modalWindow.classList.toggle("visible");
        this.textErr.innerHTML = errType;

        this.close.onclick = () => {
            this.modalBackground.classList.toggle("visible");
            this.modalWindow.classList.toggle("visible");
        }
    };

    this.handleAuthSuccess = () => {
        window.location.href = '/login/login.html';
    };
};