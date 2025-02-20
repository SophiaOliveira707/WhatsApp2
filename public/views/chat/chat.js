import { request } from "../../services/request.js";

const username = sessionStorage.getItem('username');
const password = sessionStorage.getItem('password');

const selfUsername = document.getElementById('self-username');
selfUsername.innerText = username;

var currentUsers = [];
var currentId = 2;

async function refreshMessages(){
    const user = currentUsers.find(user => user.id == currentId);
    document.getElementById('chat-username').innerText = user.nome;
    const messages = await request('/getMessages',{ username, password, id: currentId });
    console.log(messages.data);
}

async function refreshUsers(){
    const allUsers = await request('/getUsers',{ username, password });
    if(allUsers.status == 200){
        allUsers.data.forEach((user) => {
            if(!currentUsers.some(u => u.id == user.id)){//Se o usuário ainda não tiver sido adicionado
                const div = document.createElement('div');
                div.className = 'user';
    
                const img = document.createElement('img');
                img.src = '../../assets/imgs/fotodeusuario.jpeg';
                div.appendChild(img);
    
                const p = document.createElement('p');
                p.innerText = user.nome;
                div.appendChild(p);

                div.addEventListener('click',() => {
                    currentId = user.id;
                })
    
                document.querySelector('aside > #users').appendChild(div);
                currentUsers.push(user);
                currentId = user.id;
            }
        });
    }
}

await refreshUsers();
await refreshMessages();
setInterval(refreshUsers,1000);
setInterval(refreshMessages,1000);