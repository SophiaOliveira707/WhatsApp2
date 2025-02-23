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
            img.src = user.img;
            div.appendChild(img);

            const p = document.createElement('p');
            p.className = 'username';
            p.innerText = user.name;
            div.appendChild(p);

            const editButton = document.createElement('button');
            const imgButton = document.createElement('img');
            imgButton.src = 'assets/imgs/edit.png';
            editButton.appendChild(imgButton);
            div.appendChild(editButton);

            editButton.addEventListener('click', async () => {
                console.log('inacabado');
            });

            const trashButton = document.createElement('button');
            const trashImgButton = document.createElement('img');
            trashImgButton.className = 'trash-img';
            trashImgButton.src = 'assets/imgs/trash.png';
            trashButton.appendChild(trashImgButton);
            div.appendChild(trashButton);

            trashButton.addEventListener('click', async () => {
                const deleteUser = await request('/deleteUser',{ username: username, password: password, id: user.id });
                if(deleteUser.status == 200){
                    div.remove();
                }
            });

            document.querySelector('main').appendChild(div);
        });
    }
}

showUsers();