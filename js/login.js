import { addUserItemToStorage, get } from "./utils.js";

// let emailInp = get("#email-input");
let usernameInp = get("#username-input");
let passwordInp = get("#password-input");
let passwordBtn = get(".password-btn");
let signUpBtn = get('.signUp-btn');
let loginBtn = get('.login-btn');
let errorText = get('.login__error-text')

passwordBtn.onclick = function() {
    if (passwordInp.getAttribute('type') === 'password') {
        passwordInp.setAttribute('type', 'text');
        passwordBtn.querySelector('i').className = 'fa-solid fa-eye';
    } else{
        passwordInp.setAttribute('type', 'password');
        passwordBtn.querySelector('i').className = 'fa-regular fa-eye';
    }
}

signUpBtn.addEventListener('click', function() {
    let user = JSON.parse(localStorage.getItem('user'));
    if (usernameInp.value === user.username && passwordInp.value === user.password) {
        location.href = '../html/index.html';
    } else{
        errorText.textContent = "Неправильное имя пользователя или пароль";
    }
});



loginBtn.addEventListener('click', function() {
    location.href = '../html/signUp.html'
});