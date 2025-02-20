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
:heavy_multiplication_x: 4 telas (Login, Perfil, Chat, Admin)<br>
:heavy_multiplication_x: 3 tabelas (Usuario, Mensagem, Grupo, Membros e MensagemGrupo)<br>
:heavy_multiplication_x: Relação 1-N (1 Usuário envia várias mensagens mas cada mensagem pertence a somente 1 usuário)<br>
:heavy_multiplication_x: Select em 2 tabelas (Descobrir o nome do usuário a partir do seu id Mensagem-Usuario)<br>
:heavy_multiplication_x: Perfil de Admin capaz de fazer um CRUD de usuários

## Como Executar
explicação de como executar o programa

## Banco de Dados
explicação sobre o banco de dados

## Telas
explicação sobre as telas

## Organização do Projeto
explicação das escolhar de organização que fizemos

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