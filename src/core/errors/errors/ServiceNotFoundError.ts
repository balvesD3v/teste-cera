import { UseCaseError } from '../use-case-error'

export class ServiceNotFoundError extends Error implements UseCaseError {
  constructor() {
    super(`Service not found`)
  }
}
