window.addEventListener('load', () => {
    new SignInController(new SignInView());
    new LoginController(new LoginView());
    new MainController(new MainModel(), new MainView());
});