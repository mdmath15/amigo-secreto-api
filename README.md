# amigo-secreto-api

## Sobre o Projeto

Este projeto foi desenvolvido como um estudo prático para criar uma API simples para o cadastro e sorteio de eventos de amigo secreto. Através desta API, é possível gerenciar eventos, criar grupos de pessoas associados a esses eventos, e realizar o sorteio dos amigos secretos, com opções para eventos agrupados ou não. Foi implementado um sistema de login para o administrador com uma senha única que é alterada diariamente.

### Tecnologias Utilizadas

- **Backend:** Express, TypeScript
- **Database:** Prisma, PostgreSQL
- **Infraestrutura:** Docker, Docker Compose, AWS (RDS, ECS, ECR, EC2, Load Balancer)
- **CI/CD:** GitHub Actions

## Aprendizados Extras

Além das habilidades de codificação, este projeto foi uma oportunidade para explorar e aprender sobre:

- **Docker e Docker Compose:** Utilizados para a criação de ambientes isolados, facilitando a implantação e a portabilidade do projeto.
- **CI/CD com GitHub Actions:** Implementação de fluxos de trabalho para automação do processo de integração contínua e entrega contínua, com deploy automatizado na AWS a cada push na branch master.
- **Serviços AWS:**
  - **RDS:** Para hospedagem do banco de dados PostgreSQL.
  - **ECS:** Para o gerenciamento de containers, aprendendo a criar um ECR, configurar um cluster com uma instância EC2, target groups, load balancer, task definitions e serviços.

## Rodando o Projeto Localmente

Para executar o projeto localmente, siga estas etapas:

- **Clone o Repositório:**
  `git clone git@github.com:mdmath15/amigo-secreto-api.git`
- **Configuração do Ambiente:**
  - Crie um arquivo `.env` baseado no modelo fornecido em `.env.example`.
  - Preencha as variáveis de ambiente necessárias (ex: credenciais do banco de dados, configurações do servidor, etc.).
- **Usando Docker:**

  - Certifique-se de ter o Docker e o Docker Compose instalados.
  - Execute o comando para construir e iniciar os serviços:

    ```bash
    docker-compose up -d
    ```

- **Acesso:**

  - A API estará disponível em `http://localhost:8080`

  - A senha para fazer login e gerar o token de administrador é alterada diariamente e será sempre a data do dia no formato "DdMmAAAA".

## Contribuições

Contribuições são sempre bem-vindas! Se você tem alguma sugestão ou correção, fique à vontade para fazer um fork do projeto e abrir um Pull Request.
