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

  async findByFilters(filters: {
    clientId?: string
    vehicleId?: string
    status?: string
  }): Promise<Service[] | null> {
    const { clientId, vehicleId, status } = filters

    const filteredServices = this.items.filter((service) => {
      const matchesClientId = clientId
        ? service.clientId.toString() === clientId
        : true
      const matchesVehicleId = vehicleId
        ? service.vehicleId.toString() === vehicleId
        : true
      const matchesStatus = status ? service.status === status : true

      return matchesClientId && matchesVehicleId && matchesStatus
    })

    return filteredServices
  }
}
