<h1 align="center">
  📚 Sys Library
</h1>

<p align="center">
  <a href="#-tecnologias">Tecnologias</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-documentacao">Documentação Oficial</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-sobre-o-projeto">Projeto</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-instalação">Instalação</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-uso">Uso</a>&nbsp;&nbsp;&nbsp;
</p>

<br>

## 🌐 Tecnologias

O projeto foi desenvolvido com as seguintes tecnologias:

- [Node.js](https://nodejs.org/pt-br/)
- [Express](https://expressjs.com/pt-br/)
- [Prisma ORM](https://www.prisma.io/)

## 🌐 Documentação Oficial

A documentação oficial está disponível em:

- [Documentação Swagger](https://syslibrary-ts.onrender.com/docs/)

## 💻 Sobre o Projeto

Um gerenciador de tarefas simples para organizar o dia.

## 📦 Instalação

Para clonar o projeto, com o [Git](https://git-scm.com/) já instalado no seu computador, execute o comando abaixo:

```bash
git clone https://github.com/thecastrodev/syslibrary_ts.git
```

Em seguida, abra seu editor de código na pasta do seu projeto.

Para instalar as dependências execute o comando abaixo na pasta do projeto:

```bash
npm install
```

## 🔨 Uso

A primeira coisa a ser feita é configurar o Banco de Dados com o Prisma. Rode o seguinte comando:
```bash
npx prisma migrate dev
```

Para visualizar as tabelas do banco de dados, execute o comando abaixo:
```bash
npx prisma studio
```

Agora, para rodar o projeto basta executar o comando abaixo com o terminar aberto na pasta do seu projeto:
```bash
npm run dev
```

Com o projeto rodando, agora você pode acessar a seguintes rotas pelo seu navegador:
```bash
http://localhost:3333/api/v1/
```

Usando o [Insomnia](https://insomnia.rest/download), você poderá acessar as seguintes rotas de usuários:
```bash
GET http://localhost:3333/api/v1/auth/info

POST http://localhost:3333/api/v1/auth/register
  body (não copie a palavra "body", só o objeto abaixo):
  {
    "username": "your_username",
    "name": "Your Name",
    "email": "your_email@email.com",
    "password": "password123"
  }

PATCH http://localhost:3333/api/v1/auth/patch
  {
    "username": "your_username",
    "name": "Your Name",
    "email": "your_email@email.com",
    "password": "password123"
  }
```

<br/>
<br/>
<h3 align="center">
Desenvolvido por <a href="https://www.eduardocastro.dev/" target="_blank">@thecastrodev</a>
<br/>
<br/>
</h3>