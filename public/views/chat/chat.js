import { Chat } from '../../services/chat.js';

const username = sessionStorage.getItem('username');
const password = sessionStorage.getItem('password');
const chat = new Chat(username,password);
/*
setInterval(() => {//Atualiza o chat a cada 1000ms = 1 segundo
    chat.update();
},1000);*/

document.getElementById('send').addEventListener('click',() => {
    const input = document.querySelector('input');
    chat.sendMessage(input.value);
});

document.querySelector('input').addEventListener('keypress',(e) => {
    if(e.key == 'Enter'){
        const input = document.querySelector('input');
        chat.sendMessage(input.value);
    }
});