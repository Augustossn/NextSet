# NextSet 

![Java](https://img.shields.io/badge/java-%23ED8B00.svg?style=for-the-badge&logo=openjdk&logoColor=white)
![Spring](https://img.shields.io/badge/spring-%236DB33F.svg?style=for-the-badge&logo=spring&logoColor=white)
![Angular](https://img.shields.io/badge/angular-%23DD0031.svg?style=for-the-badge&logo=angular&logoColor=white)
![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)
![Bootstrap](https://img.shields.io/badge/bootstrap-%238511FA.svg?style=for-the-badge&logo=bootstrap&logoColor=white)

> **Evolua suas cargas. Supere seus limites.**

O **NextSet** é uma aplicação Fullstack desenvolvida para ajudar praticantes de musculação a gerenciar seus treinos e, principalmente, monitorar a **Progressão de Carga**. Diferente de blocos de notas comuns, o sistema calcula automaticamente seus Recordes Pessoais (PRs) baseados no histórico, oferecendo estatísticas visuais sobre sua evolução.


## Tecnologias Utilizadas

### Backend (API REST)
- **Java 17**
- **Spring Boot 3** (Web, Data JPA, Validation)
- **Spring Security** (Autenticação Stateless via JWT)
- **PostgreSQL** (Banco de dados relacional)
- **Maven** (Gerenciamento de dependências)

### Frontend (SPA)
- **Angular 17+** (Componentes, Services, Guards, Interceptors)
- **TypeScript**
- **Bootstrap 5 & Bootstrap Icons**
- **RxJS** (Programação reativa)

---

## Funcionalidades Principais

-  **Autenticação Segura:** Sistema completo de Login e Registro com tokens JWT (JSON Web Token). Proteção de rotas via *Guards* no Frontend.
-  **Gestão de Treinos:** CRUD completo de treinos. Adicione exercícios, séries, repetições e cargas.
-  **Rastreamento de PRs:** O sistema identifica automaticamente quando você bate um novo recorde (maior carga ou mais repetições com a mesma carga) e salva no seu histórico.
-  **Dashboard Estatístico:** Visualização rápida do volume total de treino e últimos recordes.
-  **Temas:** Suporte completo a **Dark Mode** (padrão) e **Light Mode**, persistido nas preferências do usuário.
-  **Gestão de Conta:** Edição de perfil e opção de "Soft Delete" (exclusão de conta) com limpeza em cascata de dados.

---

##  Como Rodar o Projeto

### Pré-requisitos
- Java 17+
- Node.js (v18+) e NPM
- PostgreSQL instalado e rodando

### 1. Configuração do Banco de Dados
Crie um banco de dados no PostgreSQL chamado `nextset_db`:
```sql
 CREATE DATABASE nextset_db;
```
 
### 2. Rodando o Backend
1. Navegue até a pasta `backend`.
2. Abra o arquivo: src/main/resources/application.properties.
3. Configure seu usuário e senha do PostgreSQL:


```properties
spring.datasource.username=seu_usuario # ex: postgres
spring.datasource.password=sua_senha
```
4. Execute a aplicação:
```bash
./mvnw spring-boot:run
```
5. O servidor iniciará na porta 8080.

### 3. Rodando o Frontend
1. Navegue até a pasta frontend.
2. Instale as dependências:
```bash
npm install
```
3. Inicie o servidor de desenvolvimento:
```bash
ng serve
```
4. Acesse http://localhost:4200 no seu navegador.

## Autor

### Augusto Soares 

Desenvolvido como projeto de portfólio focado em arquitetura limpa e boas práticas.
