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

- core: Contém funcionalidades básicas e reutilizáveis, como:

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



Arquivos de Configuração:

.env e .env.example: Arquivos para variáveis de ambiente, com .env.example servindo como modelo de configuração.
.eslintrc.json: Configurações do ESLint, para manter o padrão de código consistente.
.gitignore: Define os arquivos e pastas que não devem ser incluídos no controle de versão.
docker-compose.yml e Dockerfile: Arquivos de configuração do Docker, utilizados para criar ambientes de desenvolvimento e produção consistentes.
package.json: Lista de dependências, scripts e metadados do projeto.
README.md: Documentação principal do projeto, explicando como usá-lo, instalá-lo, etc.
tsconfig.json: Configurações do TypeScript, definindo como o código deve ser compilado.
vite.config.e2e.ts e vite.config.ts: Configurações do Vite para builds e testes de ponta a ponta.
