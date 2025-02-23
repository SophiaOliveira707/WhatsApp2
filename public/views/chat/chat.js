import { Chat } from '../../services/chat.js';

const username = sessionStorage.getItem('username');
const password = sessionStorage.getItem('password');
const chat = new Chat(username,password);

setInterval(() => {//Atualiza o chat a cada 1000ms = 1 segundo
    chat.update();
},1000);

const input = document.querySelector('input');
const sendButton = document.getElementById('send');

input.addEventListener('keypress',(e) => {
    if(e.key == 'Enter' && input.value != ''){
        chat.sendMessage(input.value);
    }
});

sendButton.addEventListener('click',() => {
    if(input.value != ''){
        chat.sendMessage(input.value);
    }
});

const aside = document.querySelector('aside');
const messages = document.getElementById('messages');

function resize(){
    if(window.innerWidth < 760){//Caso a tela seja pequena, ou exibe os contatos ou as mensagens
        aside.style.display = chat.contact.id ? 'none' : 'flex';
        messages.style.display = chat.contact.id ? 'flex' : 'none';
    }else{//Caso a tela seja grande o suficiente, exibe os dois
        aside.style.display = 'flex';
        messages.style.display = 'flex'
    }
}

resize();
window.addEventListener('resize',resize);

const quitChat = document.getElementById('quit-chat');
const main = document.querySelector('main');

quitChat.addEventListener('click',() => {
    chat.contact = {};
    aside.style.display = 'flex';
    main.style.display = 'none'
});