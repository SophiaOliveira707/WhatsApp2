import { request } from "../../services/request.js";

const username = sessionStorage.getItem('username');
const password = sessionStorage.getItem('password');

async function showUsers(){
    const users = await request('/getUsers',{ username, password });
    
    if(users.status == 200){
        users.data.forEach((user) => {
            const div = document.createElement('div');
            div.className = 'user';

            const img = document.createElement('img');
            img.src = 'assets/imgs/fotodeusuario.jpeg';
            div.appendChild(img);

            const p = document.createElement('p');
            p.className = 'username';
            p.innerText = user.nome;
            div.appendChild(p);

            const button = document.createElement('button');
            const imgButton = document.createElement('img');
            imgButton.src = 'assets/imgs/edit.png';
            button.appendChild(imgButton);
            div.appendChild(button);

            button.addEventListener('click',() => {
                console.log(`Tentando editar o usuário ${user.nome}`);
            });

            document.querySelector('main').appendChild(div);
        });
    }
}

showUsers();