$( document ).ready(function() {
    $('#login').prop("disabled", true);
});

function checkValue() {
    if($('#username').val() && $('#password').val()) $('#login').prop("disabled", false);
    else $('#login').prop("disabled", true);
};

function makeRegistrationForm() {
    $('.social-login-box').hide();
    $('#registration').html('Уже есть аккаунта? <a href="#" onclick="makeAuthorizationForm()">Авторизоваться</a>');
    $('.login-box').css('margin-left', '25%');
    $('.panel-title').html('Регистрация на сайте');
    $('#login').html('Зарегистрироваться');
    $('#authForm').attr('action', '/auth/login');
};

function makeAuthorizationForm() {
    $('.social-login-box').show();
    $('#registration').html('У вас нет аккаунта? <a href="#" onclick="makeRegistrationForm()">Регистрация');
    $('.login-box').css('margin-left', '');
    $('.panel-title').html('Авторизация на сайте');
    $('#login').html('Войти');
    $('#authForm').attr('action', '/auth/local');
};