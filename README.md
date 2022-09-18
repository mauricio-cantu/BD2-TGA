# Trabalho GA - Banco de Dados II
Trabalho do Grau A para a disciplina de Banco de Dados II (Unisinos 2022/02) sobre ORM (Object-Relational Mapping) utilizando como ferramenta o framework [AdonisJS](https://adonisjs.com/) que possui um ORM próprio, o [Lucid](https://docs.adonisjs.com/guides/database/introduction).

## Configuração inicial

### Node
A versão mínima do Node.js exigida pelo Adonis é a v14.0. Você pode obter o Node através do [site oficial](https://nodejs.org/en/) ou utilizando a ferramenta [NVM (Node Version Manager)](https://github.com/nvm-sh/nvm).

### Gerenciador de pacotes
O gerenciador de pacotes utilizado no projeto é o [Yarn](https://yarnpkg.com/).

### Banco de dados
O banco utilizado no projeto é o Postgres, portanto é necessário criar uma instância do mesmo. Atualize o arquivo .env com as configurações de acesso ao banco criado (user, password, porta e nome do banco). É possível subir facilmente uma instância Postres utilizado Docker, segue tutorial: https://hevodata.com/learn/docker-postgresql/

Após criar a instância do banco de dados e deixar ela rodando, você pode criar a estrutura das tabelas rodando o comando `node ace migration:run`.

### Aplicação
Rode o comando `yarn` para instalar as dependências.

## Execução
A interação com o banco de dados é feita via CLI. Na tabela abaixo é possível visualizar os comandos disponíveis.

Para executar um comando, é necessário rodar no terminal `node ace <comando>`. Exemplo: `node ace list:users`.

| Comando | Descrição |
| --- | --- |
| `list:users` | Lista usuários ou usuário específico caso um ID seja fornecido no comando |
| `list:post_and_tags` | Coleção de exemplos de consultas feitas na tabela de Posts |
| `create:user` | Persiste um usuário no BD |
| `create:post` | Persiste um post no BD |
| `create:tag` | Persiste uma tag no BD |
