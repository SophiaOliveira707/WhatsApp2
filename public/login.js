import { request } from "./services/request.js";

const loginButton = document.getElementById('login-button');

loginButton.addEventListener('click', async () => {
    const response = await request('/login',{ message: 'oi' });
    console.log(response);
});