# SOLID STUDY

[![en](https://img.shields.io/badge/lang-en-red.svg)](https://github.com/MatheusSanchez/gym-check-in-api/blob/master/README.md)
[![pt-br](https://img.shields.io/badge/lang-pt--br-green.svg)](https://github.com/MatheusSanchez/gym-check-in-api/blob/master/README.pt-br.md)

Este repositório destina-se ao estudo dos princípios SOLID, Design Patterns, testes unitários, testes de integração, e também GitHub Actions.

A estrutura deste repositório inclui o desenvolvimento de uma API inspirada no estilo do GymPass.

# GymPass API

## Como executar

1. Clone este repositório em sua máquina local usando o seguinte comando:
```bash
$ git clone https://github.com/MatheusSanchez/gym-check-in-api
```
2. Navegue até o diretório do projeto e instale as dependências necessárias executando:
```bash
$ npm install
```
3. Crie um arquivo .env no diretório do projeto para definir as variáveis de ambiente necessárias. Consulte o arquivo .env.example fornecido para obter as variáveis necessárias e seus valores. [.env.example](./.env.example/)

4. Use o Docker Compose para configurar o contêiner do banco de dados. Execute o seguinte comando no terminal:
```bash
$ docker compose up -d
```

5. Execute as migrações do Prisma para criar as tabelas do banco de dados:
```bash
$ npx prisma migrate dev
```

6. Inicie a API executando o seguinte comando:
```bash
$ npm run dev
```

Verifique o terminal para a mensagem: 🔥🔥🔥 HTTP Server Running 🔥🔥🔥 

# Como testar
Executar testes unitários é bastante simples; basta executar o seguinte comando:
```bash
$ npm run test
```

## Testes E2E

Existem dois scripts no arquivo [package.json](./package.json/) para configurar os testes E2E, já que os testes não devem adicionar dados ao banco de dados real.

Você pode executar os testes E2E usando o seguinte comando:

```bash
$ npm run test:e2e
```

Este script acionará toda a configuração e um novo banco de dados será gerado para executar os testes, sendo excluído após a conclusão dos testes.

Você também pode verificar os testes por meio de uma interface gráfica (UI) e conferir a cobertura usando os seguintes comandos:

```bash
$ npm run test:ui
$ npm run test:coverage
```

## RFs (Requisitos funcionais)

- [x] Deve ser possível se cadastrar;
- [x] Deve ser possível se autenticar;
- [x] Deve ser possível obter o perfil de um usuário logado;
- [x] Deve ser possível obter o número de check-ins realizados pelo usuário logado;
- [x] Deve ser possível o usuário obter o seu histórico de check-ins;
- [x] Deve ser possível o usuário buscar academias próximas (até 10km);
- [x] Deve ser possível o usuário buscar academias pelo nome;
- [x] Deve ser possível o usuário realizar check-in em uma academia;
- [x] Deve ser possível validar o check-in de um usuário;
- [x] Deve ser possível cadastrar uma academia;

## RNs (Regras de negócio)

- [x] O usuário não deve poder se cadastrar com um e-mail duplicado;
- [x] O usuário não pode fazer 2 check-ins no mesmo dia;
- [x] O usuário não pode fazer check-in se não estiver perto (100m) da academia;
- [x] O check-in só pode ser validado até 20 minutos após ser criado;
- [x] O check-in só pode ser validado por administradores;
- [x] A academia só pode ser cadastrada por administradores;

## RNFs (Requisitos não-funcionais)

- [x] A senha do usuário precisa estar criptografada;
- [x] Os dados da aplicação precisam estar persistidos em um banco PostgreSQL;
- [x] Todas listas de dados precisam estar paginadas com 20 itens por página;
- [x] O usuário deve ser identificado por um JWT (JSON Web Token);
