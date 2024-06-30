import { addUserItemToStorage, get } from "./utils.js";

let emailInp = get("#email-input");
let usernameInp = get("#username-input");
let passwordInp = get("#password-input");
let passwordBtn = get(".password-btn");
let signUpBtn = get('.signUp-btn');
let loginBtn = get('.login-btn');
let uid = new Date().getTime().toString().slice(0, 5);
let errorText = get('.login__error-text');

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
    addUserItemToStorage(uid, emailInp.value, usernameInp.value, passwordInp.value);
    if (emailInp.value && usernameInp.value && passwordInp.value) {
        location.href = '../html/index.html';
    } else {
        errorText.textContent = "Заполните все поля";
        if (!emailInp.value) {
            emailInp.style.border = '1px solid red';
        }
        if (!usernameInp.value) {
            usernameInp.style.border = '1px solid red';
        }
        if (!passwordInp.value) {
            passwordInp.style.border = '1px solid red';
        }
        throw new Error('User data is incomplete');
    }
});


loginBtn.addEventListener('click', function() {
    location.href = '../html/login.html'
});
