import { request } from './request.js';

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

    sendMessage(content){
        const { username, password, contact } = this;

        request('/sendMessage',{ username, password, contact, content }).then((message) => {
            if(message.status == 200){
                message = {
                    id: message.data.id,
                    owner: this.username,
                    receiver: this.contact.type == 'user' ? this.contact.name : null,
                    group: this.contact.type == 'group' ? this.contact.name : null,
                    content: content
                }
                this.addMessage(message);
                this.createMessage(message);
                document.querySelector('input').value = '';
            }
        });
    }

    addUser(user){
        if(!this.users[user.id]){//Ignora usuários que já existem
            this.users[user.id] = user;//Adiciona usuário na lista de usuários
            this.createContact(user,'user');
        }
    }

    addGroup(group){//Mesmo design dos usuários só que com um botão a mais
        if(!this.groups[group.id]){//Ignora grupos que já existem
            this.groups[group.id] = group;//Adiciona grupo na lista de grupos
            this.createContact(group,'group');
        }
    }

    addMessage(message){
        if(!this.messages[message.id]){//Ignora mensagens que já existem
            this.messages[message.id] = message;//Adiciona mensagem na lista de mensagens
        }
    }

    show(chat){
        document.getElementById('chat-username').innerHTML = chat.name;
        document.getElementById('chat-img').src = chat.img;
        document.getElementById('messages').innerHTML = '';
        document.querySelector('main').style.display = 'flex';
        Object.values(this.messages).forEach((message) => {
            if(message.group == null && message.owner == chat.name || message.receiver == chat.name){
                this.createMessage(message);
            }else if(message.group == chat.name){
                this.createMessage(message);
            }
        });
    }

    createContact(contact,type){
        const div = document.createElement('div');
        div.className = 'user';

        const img = document.createElement('img');
        img.src = contact.img;

        const p = document.createElement('p');
        p.innerText = contact.name;

        div.appendChild(img);
        div.appendChild(p);

        const users = document.getElementById('users');
        users.insertBefore(div,users.children[1]);
        div.addEventListener('click',() => {
            this.show(contact);
            this.contact = { id: contact.id, name: contact.name, type };
        });

        // <div class="user">
        //     <img src="assets/imgs/fotodeusuario.jpeg">
        //     <p>Luis</p>
        // </div>
    }

    createMessage(message){
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

        document.getElementById('messages').appendChild(div);

        // <div class="message">
        //     <p class="username">Luis</p>
        //     <p class="content">oi</p>
        // </div>
    }
}