import { request } from './request.js';

const chatUsername = document.getElementById('chat-username');
const chatImage = document.getElementById('chat-img');
const messages = document.getElementById('messages');
const users = document.getElementById('users');
const input = document.querySelector('input');
const main = document.querySelector('main');

export class Chat{
    constructor(username,password){
        this.username = username;
        this.password = password;
        this.users = {};
        this.groups = {};
        this.messages = {};
        this.contact = {};

        //Coloca o nome do usuário no topo da tela de chat
        document.getElementById('username').innerText = username;

        this.update();
    }

    update(){
        const { username, password } = this;

        request('/getGroups',{ username, password }).then((groups) => {
            if(groups.status == 200){
                groups.data.forEach((group) => this.addGroup(group));
            }
        });

        request('/getUsers',{ username, password }).then((users) => {
            if(users.status == 200){
                users.data.forEach((user) => this.addUser(user));
            }
        });

        request('/getMessages',{ username, password }).then((messages) => {
            if(messages.status == 200){
                messages.data.forEach((message) => this.addMessage(message));
            }
        });
    }

    sendMessage(content){//Envia mensagens para o contato aberto (grupo ou usuário)
        const { username, password, contact } = this;

        request('/sendMessage',{ username, password, contact, content }).then((message) => {
            if(message.status == 200){
                input.value = '';
                this.addMessage({
                    id: message.data.id,
                    owner: this.username,
                    receiver: this.contact.type == 'user' ? this.contact.name : null,
                    group: this.contact.type == 'group' ? this.contact.name : null,
                    content: content
                });
            }
        });
    }

    addUser(user){//Adiciona um usuário e cria seu contato
        if(!this.users[user.id]){//Ignora usuários que já existem
            this.users[user.id] = user;//Adiciona usuário na lista de usuários
            this.createContact(user,'user');
        }
    }

    addGroup(group){//Adiciona um grupo e cria seu contato
        if(!this.groups[group.id]){//Ignora grupos que já existem
            this.groups[group.id] = group;//Adiciona grupo na lista de grupos
            this.createContact(group,'group');
        }
    }

    addMessage(message){//Adiciona uma mensagem mas só exibe ela caso o contato esteja aberto
        if(!this.messages[message.id]){//Ignora mensagens que já existem
            this.messages[message.id] = message;//Adiciona mensagem na lista de mensagens
            if(this.contact.type == 'group'){
                if(this.contact.name == message.group){
                    this.createMessage(message);
                }
            }else if(this.contact.name == message.owner || this.contact.name == message.receiver){
                this.createMessage(message);
            }
        }
    }

    show(chat){//Exibe as mensagens de um nome de contato específico
        window.dispatchEvent(new Event('resize'));
        chatUsername.innerHTML = chat.name;
        chatImage.src = chat.img;
        messages.innerHTML = '';
        main.style.display = 'flex';
        Object.values(this.messages).forEach((message) => {
            if(message.group == null && message.owner == chat.name || message.receiver == chat.name){
                this.createMessage(message);
            }else if(message.group == chat.name){
                this.createMessage(message);
            }
        });
    }

    createContact(contact,type){//Cria o elemento do contato (ao clicar, exibe as mensagens do contato)
        const div = document.createElement('div');
        div.className = 'user';

        const img = document.createElement('img');
        img.src = contact.img;

        const p = document.createElement('p');
        p.innerText = contact.name;

        div.appendChild(img);
        div.appendChild(p);

        div.addEventListener('click',() => {
            this.contact = { id: contact.id, name: contact.name, type };
            this.show(contact);
        });

        if(type == 'group'){//Adiciona novos grupos no primeiro lugar dos contatos
            users.insertBefore(div,users.children[0]);
        }else{//Adiciona novos usuários depois dos grupos
            users.insertBefore(div,users.children[Object.keys(this.groups).length]);
        }

        // <div class="user">
        //     <img src="assets/imgs/fotodeusuario.jpeg">
        //     <p>Luis</p>
        // </div>
    }

    createMessage(message){//Cria uma mensagem na tela
        const div = document.createElement('div');
        div.className = message.owner == this.username ? 'message self' : 'message';

        const p1 = document.createElement('p');
        p1.className = 'username';
        p1.innerText = message.owner;

        const p2 = document.createElement('p');
        p2.className = 'content';
        p2.innerText = message.content;

        div.appendChild(p1);
        div.appendChild(p2);

        messages.appendChild(div);
        messages.scrollTo(0,messages.scrollHeight);//Vai para as últimas mensagens

        // <div class="message">
        //     <p class="username">Luis</p>
        //     <p class="content">oi</p>
        // </div>
    }
}