import { ServiceRepository } from '../../src/domain/application/repositories/service.repository'
import { Service } from '../../src/domain/enterprise/entities/service'

export class InMemoryServiceRepository implements ServiceRepository {
  public items: Service[] = []

  async create(service: Service) {
    this.items.push(service)
  }

  async update(service: Service) {
    const itemIndex = this.items.findIndex((item) => item.id === service.id)
    this.items[itemIndex] = service
  }

  async delete(service: Service) {
    const itemIndex = this.items.findIndex((item) => item.id === service.id)
    this.items.splice(itemIndex, 1)
  }

  async findAll() {
    return this.items
  }

  async findById(id: string) {
    const service = this.items.find((item) => item.id.toString() === id)

    if (!service) {
      return null
    }

    return service
  }
}
