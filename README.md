# WhatsApp2
###### Sophia Oliveira e Luís Gustavo
Este é um projeto das disciplinas de **Banco de Dados** e **Autoria Web**.
O projeto consiste em uma réplica do WhatsApp, um site que lhe permite enviar mensagens e criar grupos. Ele funciona com base em um servidor [Express](https://expressjs.com/pt-br/) rodando num backend [Node](https://nodejs.org/pt) e um banco de dados [Postgres](https://www.postgresql.org/).

Neste projeto utilizamos o protocolo **HTTP** com requisições `GET` e `POST` (Requisições PUT e DELETE foram ignoradas para manter a simplicidade do sistema). Outras tecnologias como [JWT](https://www.alura.com.br/artigos/o-que-e-json-web-tokens?srsltid=AfmBOoq4-xltWHO80OVU764YtYRlAB7zzRJ5U4HsWSIFnSMvWnzt1AB1) e [Web Socket](https://developer.mozilla.org/pt-BR/docs/Web/API/WebSockets_API) foram ignoradas pelo mesmo motivo e achamos importante citá-las como a forma correta.

> [!WARNING]  
> O protocolo deveria ser HTTPS e não HTTP<br>
> A autenticação deveria ser criptografada com JWT (Json Web Token)<br>
> A comunicação deveria ser feita através de Web Sockets

## Requisitos
:ballot_box_with_check: Tela de login<br>
:ballot_box_with_check: 4 telas (Login, Register, Chat, Admin)<br>
:ballot_box_with_check: 3 tabelas (Usuarios, Mensagens, Grupos, Membros)<br>
:ballot_box_with_check: Relação 1-N (1 Usuário envia várias mensagens mas cada mensagem pertence a somente 1 usuário)<br>
:heavy_multiplication_x: Select em 2 tabelas<br>
:ballot_box_with_check: Select em 3 tabelas (Procurar mensagens de grupos em que você é membro)<br>
:ballot_box_with_check: Perfil de Admin capaz de fazer um CRUD de usuários

## Como Executar
1. Clonar o repositório
2. Instalar as dependências com `npm install`
3. Executar o script `npm run dbSeed`
4. Executar o script `npm run start`

O banco de dados precisa estar criado (mesmo que vazio) e pode ser necessário trocar alguma informação do .env para conectar ao banco de dados correto.

## Organização do Projeto
O projeto é separado em 2 pastas principais:
- `private` Onde fica o backend
- `public` Onde fica o frontend

Conforme descrito no seguinte trecho de `private/server.js`:
```js
this.server.use(express.static(path.join(__dirname,'..','public')));
```

O servidor usa a pasta `public` de forma estática, ou seja, não existem restrições ao requisitar arquivos desta pasta, semelhante ao funcionamento do Xampp.

### Private
A pasta private possui as seguintes pastas:
- `controllers` Definem o comportamento de cada rota do servidor
- `services` e `utils` Guardam funções auxiliares para os controladores
- `scripts` Guarda arquivos de execução única (como o dbSeed.js que constrói o banco de dados do zero)

### Public
A pasta public guarda as seguintes pastas:
- `assets` Guarda imagens usadas no site
- `views` Guarda as telas do programa (html/css/js)
- `services` Guarda funções auxiliares para o js das telas

## Área Dev (ignorar)

Apresentação:
tecnologias, estrutura do bd (relacionamentos), proposta, telas e funcionalidades
vídeo do programa funcionando

### Comandos GIT
- Clonar repositório `git clone <link>`
- Puxar alterações do github `git pull origin main`
- Adicionar arquivos na fila de commit `git add .`
- Salvar mudanças (commit) `git commit -m "<mensagem>"`
- Lançar mudanças no github `git push origin main`