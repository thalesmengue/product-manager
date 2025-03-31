# Gerenciador de Produtos

## Descrição
Este é um aplicativo simples de gerenciamento de produtos que permite aos usuários adicionar, visualizar, atualizar e excluir produtos. O aplicativo é construído usando Laravel com Doctrine ORM, ReactJS no frontend e MySQL como banco de dados.

## Como rodar

```bash
# clonar o projeto
$ git clone git@github.com:thalesmengue/product-manager.git

# clonar os arquivos de ambiente
$ cp frontend/.env.example frontend/.env
$ cp backend/.env.example backend/.env

# instalar dependências do backend
$ cd backend
$ composer install

# instalar dependências do frontend
$ cd frontend
$ npm install

# construir contêineres docker
$ docker-compose up
or
$ docker compose up

# executar migrações
$ backend/console.sh artisan migrate
```

depois de seguir os passos acima, o frontend da aplicação deve estar disponível em `http://localhost:3000` e o backend em `http://localhost/api`.

## Rotas
| Método HTTP | Endpoint             | Observação                                                                                                                                                    |
|-------------|----------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------|
| GET         | `/api/products`      | Listagem de produtos paginados. Essa rota aceita três query param, `page, per_page, search`, usados para controlar a paginação e a busca de produtos por nome |
| POST        | `/api/products`      | Rota para cadastrar um produto novo.                                                                                                                          |
| PUT         | `/api/products/{id}` | Rota para atualizar um produto existente.                                                                                                                     |
| DELETE      | `/api/products/{id}` | Rota para deletar um produto existente.                                                                                                                       |

## Listar produtos
### Parâmetros da Query

| Parâmetro | Tipo    | Descrição                                                  | Obrigatório |
|-----------|---------|-------------------------------------------------------------|-------------|
| page      | integer | Número da página para paginação                             | Não         |
| per_page  | integer | Quantidade de itens por página                              | Não         |
| search    | string  | Termo de busca para filtrar produtos pelo nome              | Não         |

### Exemplo de Requisição

```http
GET /api/products?page=1&per_page=10&search=smartphone HTTP/1.1
Host: localhost
Accept: application/json
```

## Cadastrar produto
### Parâmetros da Requisição
```http
POST /api/products HTTP/1.1
Host: localhost
Accept: application/json
```

### Corpo da requisição
```json
{
  "name": "Notebook Dell Inspiron",
  "description": "Notebook com processador Intel Core i5, 8GB RAM e 256GB SSD",
  "sku": "DELL-INSP-15-2023",
  "price": 4599.90,
  "category": "Eletrônicos",
  "is_active": true
}
```

## Atualizar produto
### Parâmetros da Requisição
```http
PUT /api/products/1 HTTP/1.1
Host: localhost
Accept: application/json
```

### Corpo da requisição
```json
{
  "name": "Notebook Dell Inspiron",
  "description": "Notebook com processador Intel Core i5, 8GB RAM e 256GB SSD",
  "sku": "DELL-INSP-15-2023",
  "price": 4599.90,
  "category": "Eletrônicos",
  "is_active": true
}
```

## Deletar produto
### Parâmetros da Requisição
```http
DELETE /api/products/1 HTTP/1.1
Host: localhost
Accept: application/json
```


## Arquitetura

O backend da aplicação foi desenvolvido dividindo sua arquitutura entre o repository pattern e o service pattern, com uma divisão clara de responsabilidades entre as camadas e com o uso de injeção de dependência, tornando a aplicação mais mantenível e escalável.

Backend:

- A camada de repository (repository pattern) foi utilizada para abstrair a camada de persistência de dados da aplicação.
- A camada de service (service pattern) foi utilizada para abstrair a lógica de negócio da aplicação.
- O uso de Resource API para padronizar a resposta da API.
- Já que foi utilizado o Doctrine como ORM, utilizei o sistema de injeção de dependência por bind do Laravel, dessa forma, é respeitado o princípio da Inversão de Dependência e, facilita a substituição desse contrato caso preciso.

Frontend:
- Separação de hooks e chamadas de API para facilitar a reutilização da lógica caso necessário.
- Componentes do shadcn para facilitar a construção da aplicação, produtividade e manutenção.
- Retornos fortemente tipados para garantir a integridade dos dados.
- Gerenciamento de estado com o React Query, atualiza os dados dispostos na listagem após uma mutação (nova busca, atualização, criação ou deleção) dessa forma, mantendo os dados atualizados, bem como, cache inteligente dos dados recuperados para garantir um melhor desempenho da aplicação.
- Componentes separados por responsabilidade, facilitando a manutenção e reutilização dos mesmos.

### Referências
- [Laravel 12](https://laravel.com/docs/12.x)
- [Doctrine ORM](https://www.doctrine-project.org/projects/orm.html)
- [ReactJS](https://react.dev/)
- [React Query](https://tanstack.com/query/latest)
- [Tailwind 4](https://tailwindcss.com/docs)
- [Shadcn](https://ui.shadcn.com/docs)
- [Docker](https://docs.docker.com/)