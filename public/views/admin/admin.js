import { request } from "../../services/request.js";

const username = sessionStorage.getItem('username');
const password = sessionStorage.getItem('password');

async function showUsers(){
    const users = await request('/getUsers',{ username: username, password: password });
    
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

            const editButton = document.createElement('button');
            const imgButton = document.createElement('img');
            imgButton.src = 'assets/imgs/edit.png';
            editButton.appendChild(imgButton);
            div.appendChild(editButton);

            editButton.addEventListener('click', async () => {
                const editPage = await request('/editUser',{ username: username, password: password, targetUserId: user.id });
                if(editPage.status == 200){
                    console.log('redirecionar para página de edição do usuário');
                }
            });

            const trashButton = document.createElement('button');
            const trashImgButton = document.createElement('img');
            trashImgButton.className = 'trash-img';
            trashImgButton.src = 'assets/imgs/trash.png';
            trashButton.appendChild(trashImgButton);
            div.appendChild(trashButton);

            trashButton.addEventListener('click', async () => {
                const deleteUser = await request('/deleteUser',{ username: username, password: password, targetUserId: user.id });
                if(deleteUser.status == 200){
                    console.log('usuário apagado com sucesso');
                    div.remove();
                }
            });

            document.querySelector('main').appendChild(div);
        });
    }
}

showUsers();