import { servicesPaths } from './services'

export const swaggerDocument = {
  openapi: '3.0.0',
  info: {
    title: 'API Documentation',
    version: '1.0.0',
    description: 'Documentação da API de Serviços',
  },
  paths: {
    ...servicesPaths,
  },
}
