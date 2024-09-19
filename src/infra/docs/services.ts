export const servicesPaths = {
  '/services': {
    post: {
      summary: 'Cria um novo serviço',
      tags: ['Serviços'],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              required: [
                'description',
                'serviceDate',
                'vehicleId',
                'clientId',
                'status',
                'price',
              ],
              properties: {
                description: {
                  type: 'string',
                  description: 'Descrição do serviço',
                  example: 'Troca de óleo',
                },
                serviceDate: {
                  type: 'string',
                  format: 'date-time',
                  description: 'Data do serviço',
                  example: '2023-09-18T10:00:00Z',
                },
                vehicleId: {
                  type: 'string',
                  description: 'ID do veículo',
                  example: '1234567890',
                },
                clientId: {
                  type: 'string',
                  description: 'ID do cliente',
                  example: '0987654321',
                },
                status: {
                  type: 'string',
                  description: 'Status do serviço',
                  example: 'pendente',
                },
                price: {
                  type: 'number',
                  description: 'Preço do serviço',
                  example: 260.0,
                },
              },
            },
          },
        },
      },
      responses: {
        201: { description: 'Serviço criado com sucesso' },
        400: { description: 'Erro na validação dos dados fornecidos' },
      },
    },
    get: {
      summary: 'Retorna todos os serviços',
      tags: ['Serviços'],
      responses: {
        200: { description: 'Lista de serviços' },
      },
    },
  },
  '/services/{id}': {
    get: {
      summary: 'Retorna um serviço pelo ID',
      tags: ['Serviços'],
      parameters: [
        {
          in: 'path',
          name: 'id',
          required: true,
          description: 'ID do serviço',
          schema: { type: 'string' },
        },
      ],
      responses: {
        200: { description: 'Serviço retornado com sucesso' },
        404: { description: 'Serviço não encontrado' },
      },
    },
    delete: {
      summary: 'Exclui um serviço pelo ID',
      tags: ['Serviços'],
      parameters: [
        {
          in: 'path',
          name: 'id',
          required: true,
          description: 'ID do serviço',
          schema: { type: 'string' },
        },
      ],
      responses: {
        200: { description: 'Serviço excluído com sucesso' },
        404: { description: 'Serviço não encontrado' },
      },
    },
    put: {
      summary: 'Atualiza um serviço pelo ID',
      tags: ['Serviços'],
      parameters: [
        {
          in: 'path',
          name: 'id',
          required: true,
          description: 'ID do serviço',
          schema: { type: 'string' },
        },
      ],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                description: {
                  type: 'string',
                  description: 'Descrição do serviço',
                  example: 'Troca de óleo',
                },
                serviceDate: {
                  type: 'string',
                  format: 'date-time',
                  description: 'Data do serviço',
                },
                vehicleId: {
                  type: 'string',
                  description: 'ID do veículo',
                },
                clientId: {
                  type: 'string',
                  description: 'ID do cliente',
                },
                status: {
                  type: 'string',
                  description: 'Status do serviço',
                },
                price: {
                  type: 'number',
                },
              },
            },
          },
        },
      },
      responses: {
        200: { description: 'Serviço atualizado com sucesso' },
        404: { description: 'Serviço não encontrado' },
      },
    },
  },
}
