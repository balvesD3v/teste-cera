import { UseCaseError } from '../use-case-error'

export class ServiceNotFoundError extends Error implements UseCaseError {
  constructor() {
    super(`Serviço não encontrado`)
  }
}
