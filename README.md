# NestJS + React Boilerplate

[Postgres](https://img.shields.io/badge/Postgres-316192?style=for-the-badge&logo=postgresql&logoColor=white)[NestJS](https://img.shields.io/badge/NestJS-E0234E?style=for-the-badge&logo=nestjs&logoColor=white)[Prisma](https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white)[Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)[semantic-release: angular](https://img.shields.io/badge/semantic--release-angular-e10079?logo=semantic-release)
## Descrição

ste projeto é um boilerplate que integra o backend desenvolvido com [NestJS](https://nestjs.com/) e o frontend com [React](https://reactjs.org/).le utiliza o [Prisma](https://www.prisma.io/) como ORM para o banco de dados [PostgreSQL](https://www.postgresql.org/), facilitando o desenvolvimento de aplicações full-stack robustas e escaláveis.
## Estrutura do Projeto

 estrutura do projeto é organizada da seguinte forma:
```
/templates
  ├── /backend
  └── /frontend
```

- **/backend**: ontém o código-fonte do servidor NestJS.- **/frontend**: ontém o código-fonte da aplicação React.
## Instalação

ara iniciar um novo projeto utilizando este boilerplate, execute o seguinte comando:
```bash
npx @leandrobataglia/react-nestjs-boilerplate <pasta>
```

- `<pasta>`: pcional. Especifique `backend` ou `frontend` para inicializar apenas a parte correspondente do projeto.e omitido, ambas as partes serão configuradas.
## Configuração do Banco de Dados

 projeto utiliza o PostgreSQL como banco de dados, com schemas gerenciados pelo Prisma.ara facilitar a configuração do ambiente de desenvolvimento, utilize o [Docker Compose](https://docs.docker.com/compose/):
```yaml
version: '3'
services:
  dev-db:
    image: postgres:13
    ports:
      - 5432:5432
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: 123
      POSTGRES_DB: nest

  test-db:
    image: postgres:13
    ports:
      - 6432:5432
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: 123
      POSTGRES_DB: nest
```

ste arquivo define dois serviços PostgreSQL:
- **dev-db**: anco de dados para desenvolvimento, acessível na porta 5432.- **test-db**: anco de dados para testes, acessível na porta 6432.
ara iniciar os serviços, execute:
```bash
docker-compose up -d
```

## Publicação Automatizada

ste projeto utiliza o [semantic-release](https://semantic-release.gitbook.io/semantic-release/) para automatizar o processo de versionamento e publicação de pacotes.s versões são geradas automaticamente com base nas mensagens de commit, garantindo um fluxo de trabalho consistente e semânticamente versionado.
## Dependências Principais

[NestJS](https://img.shields.io/badge/NestJS-10.0.0-E0234E?style=flat-square&logo=nestjs&logoColor=white)[Prisma Client](https://img.shields.io/badge/Prisma%20Client-6.2.1-2D3748?style=flat-square&logo=prisma&logoColor=white)[Argon2](https://img.shields.io/badge/Argon2-0.41.1-2D3748?style=flat-square)[Class Transformer](https://img.shields.io/badge/Class%20Transformer-0.5.1-2D3748?style=flat-square)[Class Validator](https://img.shields.io/badge/Class%20Validator-0.14.1-2D3748?style=flat-square)[Dotenv CLI](https://img.shields.io/badge/Dotenv%20CLI-8.0.0-2D3748?style=flat-square)[Passport](https://img.shields.io/badge/Passport-0.7.0-34E27A?style=flat-square&logo=passport&logoColor=white)[Passport JWT](https://img.shields.io/badge/Passport%20JWT-4.0.1-34E27A?style=flat-square&logo=passport&logoColor=white)[pg](https://img.shields.io/badge/pg-8.13.1-316192?style=flat-square&logo=postgresql&logoColor=white)[Reflect Metadata](https://img.shields.io/badge/Reflect%20Metadata-0.2.0-2D3748?style=flat-square)[RxJS](https://img.shields.io/badge/RxJS-7.8.1-B7178C?style=flat-square&logo=reactivex&logoColor=white)[TypeORM](https://img.shields.io/badge/TypeORM-0.3.20-2D3748?style=flat-square)
ara uma lista completa das dependências e suas versões, consulte o arquivo `package.json`.
