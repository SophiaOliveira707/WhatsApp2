import { request } from "../../services/request.js";

const username = document.getElementById('username');
const password = document.getElementById ('password');
const loginButton = document.getElementById('login-button');
const warning = document.getElementById('warning');

loginButton.addEventListener('click', async () => {
    if(!username.value || !password.value){
        return warning.innerHTML = 'Usuário ou senha em branco';
    }

    const response = await request('/login',{ username: username.value, password: password.value, createAccount: window.location.href.includes('register') });
    if(response.status == 200){
        sessionStorage.setItem('username',username.value);
        sessionStorage.setItem('password',password.value);
        window.location = response.data.page;
    }else{
        warning.innerHTML = response.data.message;
    }
});