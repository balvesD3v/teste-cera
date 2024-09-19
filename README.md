# CERA Plataforma - Gestão Automotiva

API de gerenciamento de serviços automotivos. 

## Introdução
Esta API permitirá que os usuários (mecânicos, gestores de oficina, etc.) possam gerenciar os serviços realizados em veículos, incluindo a criação, atualização, consulta e exclusão de registros de serviços.

## Funcionalidades
- Criação de serviços
- Atualização de serviços
- Deleção de serviços
- Buscar todos os serviços
- Buscar serviço por filtro (clientID, vehicleID, status)
- Buscar serviço pelo ID do serviço

## Tecnologias Utilizadas
- Backend: Express, Vitest, Mongoose
- Banco de Dados: MongoDB
- Outras ferramentas: Zod, Docker, typeScript, swagger, eslint, supertest, dotenv

## Arquitetura do Projeto
O projeto segue uma arquitetura modular e organizada, visando a separação de responsabilidades e a facilidade de manutenção e escalabilidade. A estrutura é dividida em camadas, cada uma com seu propósito específico:

![image](https://github.com/user-attachments/assets/ff512dba-2f9b-451d-aa1a-99d245bfc7f3)

- dist: Pasta onde os arquivos compilados são gerados, geralmente configurada no tsconfig.json. É o diretório final que contém o código pronto para execução.

- node_modules: Diretório padrão do Node.js que armazena todas as dependências e pacotes instalados pelo npm ou yarn.

- src: Diretório principal do código-fonte do projeto. Ele está subdividido em várias camadas, seguindo a abordagem de arquitetura limpa:

    -   core: Contém funcionalidades básicas e reutilizáveis, como:

        - entities: Entidades centrais do domínio, definindo as principais regras e estruturas de dados.
        -  errors: Definições de erros customizados usados no domínio.
        - either.ts e either.test.ts: Implementação e testes de um monad Either, comumente utilizado para manipulação de resultados que podem ser sucesso ou falha.

    - domain: Responsável pela lógica de aplicação e regras de negócio.

        - application: Contém a lógica da aplicação que lida com os casos de uso.
            - repositories: Interfaces que definem contratos para persistência de dados.
            - use-cases: Implementações dos casos de uso, representando as ações que a aplicação pode realizar.
            - validators: Lógica de validação de dados de entrada, garantindo que as regras do negócio sejam respeitadas.

        - enterprise: Entidades específicas do domínio empresarial, com suas próprias lógicas.
        - entities: Contém as entidades principais do negócio, como service.ts, que provavelmente define um modelo de serviço.
    - infra: Infraestrutura do projeto, lidando com a interação com o mundo externo (ex: banco de dados, APIs).
- test: Diretório contendo os testes da aplicação. É provável que estejam estruturados para abranger testes unitários, de integração e de ponta a ponta.

## Instalação e configuração

## Passo a passo
1. Clone o repositório 
    ````
    git clone git@github.com:balvesD3v/teste-cera.git
    ````
2. Navegue para a pasta do projeto:
    ````
    cd teste-cera
    ````
3. Defina a varíavel de ambienta DATABASE_URL
    ```bash
    Crie um .env seguindo o .env.example

    DATABASE_URL=mongodb://seu_banco:27017/nome_da_base_de_dados
    ````
4. Instale as dependências
    ````
    npm install
    ````
5. Execute o build do typescript
    ````
    npm run build
    ````
6. Inicie a aplicação com 
    ````
    npm run dev
    ````    
5. O projeto vai está rodando na porta 3000

## Uso
Após a instalação, você pode interagir com o sistema por meio de endpoints RESTful. Abaixo, estão as instruções para utilizar cada funcionalidade do sistema.

### Cadastro de Serviços
#### Para cadastrar um novo serviço, envie um POST para o seguinte endpoint:
````
POST /api/services
````
![Descrição do GIF](https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExaWFsZXZ1aHdqOWdpOTAxOWplZjZyZjFneDVjdXIwajFsdm44MDRyeiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/dfeXfSS9RUsuzz7Jyl/giphy.webp)

- Campos Obrigatórios
    - descricao: Descrição do serviço.
    - dataHora: Data e hora de realização do serviço (formato ISO 8601).
    - veiculoId: ID do veículo associado ao serviço.
    - clienteId: ID do cliente proprietário do veículo.
    - status: Status do serviço (e.g., Pendente, Em Andamento, Concluído).
    - valor: Valor do serviço.

### Atualização de Serviços
#### Para atualizar um serviço existente, envie um PUT para o seguinte endpoint:
````
PUT /api/services/:id
````
![Descrição do GIF](https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExZzN1OHFjMTdocnFuZjl1N3V4eXZsdngxODFkZ3E0Ym41ZTUxYzVlaSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3cA94ttA9Ufkjb2F8W/giphy.gif)

Campos Atualizáveis
Você pode atualizar qualquer campo do serviço, exceto o ID.

### Consulta de Serviços
#### Para consultar serviços, você pode usar os seguintes endpoints:

Listar Todos os Serviços
````
GET /api/services
````
![Descrição do GIF](https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExZWRkNzN0cGg0ZWxwbHdudzd2N3JuNmR1bHJsbnppM3VtaWlpNm5rdyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/FBKvxc0p7rphamK5XF/giphy.webp)

Por ID do Serviço
````
GET /api/services/:id
````
![Descrição do GIF](https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExaGE5YXh2aHIwaTFpMjIxc2xnZHB0Nml4dzg0a2Zya2M3a2o3NnZ4dyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/0D2ro8Pq9DahyKgDk2/giphy.webp)

### Consulta de Serviços Filtrados
#### Para consultar serviços de forma filtrada, você pode utilizar o seguinte endpoint:
Por ID do Cliente ou VehicleID ou Status (utilize query aqui)
````
GET /api/servicesfiltered
````
![Descrição do GIF](https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExdHJ0NnJtM3ZpNHFod3phNmw3NGxseHB1dGxwaTl0NjhtZGF6Z2docCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/rvUBstf4rS6AKnHUJT/giphy.webp)

- Parâmetros de Consulta
- Você pode usar os seguintes parâmetros de consulta para filtrar os serviços retornados:

    - clientId: Filtra os serviços pelo ID do cliente.
    - vehicleId: Filtra os serviços pelo ID do veículo.
    - status: Filtra os serviços pelo status (Pendente, Em Andamento, Concluído).

### Exclusão de Serviços
#### Para excluir um serviço pelo ID, envie um DELETE para o seguinte endpoint:
````
DELETE /api/services/:id
````
![Descrição do GIF](https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExbWZqcjJtZWI4N25rNndzMW04cTB6Znl3OTd6djR3Z3BjYjhqajl5ZCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/gLV7bVKzXqZmwbp7RH/giphy.gif)

## Testes
O projeto utiliza o Vitest como framework de testes, permitindo a execução de testes unitários e de integração.

### Para rodar os testes unitários execute o seguinte comado:
````
npm test
````
### Para rodar os testes end-to-end execute o seguinte comado:
````
npm run test:e2e
````
## Documentação da API
A documentação da API está disponível e pode ser acessada através do seguinte link:

[Documentação da API](http://localhost:3000/api-docs)

### Como Acessar

1. Certifique-se de que o servidor da aplicação esteja em execução.
2. Abra seu navegador e navegue até o endereço acima para visualizar a documentação interativa da API.

## Autor
Luiz Paulo Barbosa

- [Meu Linkedin](https://www.linkedin.com/in/paulobarbosacode/)
- [Meu Github](https://github.com/balvesD3v)
