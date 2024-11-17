# Node Blog CRUD

## Descrição

Este é um projeto de blog desenvolvido com **Node.js**, **Express** e **MySQL** para gerenciar artigos e categorias. Ele permite realizar operações de CRUD (Create, Read, Update, Delete) tanto para artigos quanto para categorias.

---

## Tecnologias Utilizadas

- **Node.js**: Servidor backend.
- **Express**: Framework para criação de rotas e middlewares.
- **Sequelize**: ORM utilizado para manipulação do banco de dados MySQL.
- **EJS**: Template engine para renderização de views.
- **MySQL**: Banco de dados relacional para armazenamento de dados.

---

## Funcionalidades

1. **CRUD de Categorias**:

   - Criar, listar, editar e excluir categorias.

2. **CRUD de Artigos**:

   - Criar, listar, editar e excluir artigos.

3. **Relacionamento entre Artigos e Categorias**:
   - Um artigo pertence a uma categoria (**1:1**) com o uso de `belongsTo` no Sequelize.
   - Uma categoria pode ter vários artigos (**1:N**) com o uso de `hasMany` no Sequelize.

---

## Estrutura do Projeto

```
NODE_BLOG_CRUD/
│
├── controllers/
│ ├── ArticlesController.js
│ ├── CategoriesController.js
│
├── models/
│ ├── Article.js
│ ├── Category.js
│
├── views/
│ ├── partials/
│ │ ├── header.ejs
│ │ ├── footer.ejs
│ ├── index.ejs
│
├── public/
│ ├── css/
│ │ ├── styles.css
│ ├── js/
│ │ ├── scripts.js
│ ├── images/
│
├── database/
│ ├── database.js
│
├── main.js
├── package.json
└── .gitignore
```

---

## Configuração do Banco de Dados

O banco de dados deve ser configurado no arquivo `database.js`. Exemplo de conexão:

```javascript
const Sequelize = require("sequelize");

const connection = new Sequelize("blog_crud", "root", "1234", {
  host: "localhost",
  dialect: "mysql",
});

module.exports = connection;
```

## Autor

Desenvolvido por Diego Franco
