import { UseCaseError } from '../use-case-error'

export class BadRequestException extends Error implements UseCaseError {
  constructor(message: string) {
    super(message)
    this.name = 'BadRequestException'
  }
}
