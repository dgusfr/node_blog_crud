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
├── controllers/ # Controladores para lógica de negócio
│ ├── ArticlesController.js
│ ├── CategoriesController.js
│
├── models/ # Modelos Sequelize (Banco de Dados)
│ ├── Article.js
│ ├── Category.js
│
├── views/ # Templates EJS
│ ├── partials/ # Componentes reutilizáveis (header, footer)
│ │ ├── header.ejs
│ │ ├── footer.ejs
│ ├── index.ejs
│
├── public/ # Arquivos estáticos
│ ├── css/
│ │ ├── styles.css
│ ├── js/
│ │ ├── scripts.js
│ ├── images/
│
├── database/ # Configuração do banco de dados
│ ├── database.js
│
├── main.js # Arquivo principal do servidor
├── package.json # Dependências do projeto
└── .gitignore # Arquivos ignorados no versionamento
```
