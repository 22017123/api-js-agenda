Baixe a imagem do postgres:

`docker pull postgres`

Crie um container PostgreSQL:

`docker run --name my-postgres -e POSTGRES_PASSWORD=admin -p 5432:5432 -d postgres`

Conecte no banco com:

`docker exec -it my-postgres psql -U postgres`

Crie uma banco:

`CREATE DATABASE agenda;`

Conecte ao banco:

`\c agenda`

Crie uma tabela:

```
CREATE TABLE contato (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    telefone VARCHAR(15) NOT NULL,
    email VARCHAR(255) NOT NULL,
    nota VARCHAR(6),
    ativo BOOLEAN DEFAULT TRUE
);
```

Desconecte com:

`\q`

Crie uma aplicação node:

`npm init -y`

Instale as seguintes dependências:

`npm i express dotenv joi pg`

Adicione no arquivo `package.json` a seguinte configuração para trabalhar com módulos:

`"type": "module"`

Depois de inserir o código, inicie com:

`node src/server.js`

Para testar os endpoints faça requisições para:

`http://localhost:3000/`

Pare a aplicação com:

`Ctrl + C`

Veja o id do container com:

`docker ps`

Pare o container com:

`docker stop <container_id>`

Inicie o container com:

`docker start <container_id>`
