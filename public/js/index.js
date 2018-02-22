$( document ).ready(function() {
    $('#login').prop("disabled", true);
});

function checkValue() {
    if($('#username').val() && $('#password').val()) $('#login').prop("disabled", false);
    else $('#login').prop("disabled", true);
};

function makeRegistrationForm() {
    $('.social-login-box').hide();
    //$('#registration').html('Вернуться ');
    $('.login-box').css('margin-left', '25%');
    $('.panel-title').html('Регистрация на сайте');
    $('#login').html('Зарегистрироваться');
};