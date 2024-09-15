import { Entity } from '../../../core/entities/entity'
import { UniqueEntityId } from '../../../core/entities/unique-entity-id'

interface ServiceProps {
  description: string
  serviceDate: Date
  vehicleId: UniqueEntityId
  clientId: UniqueEntityId
  status: 'pending' | 'completed' | 'canceled'
  price: number
}

export class Service extends Entity<ServiceProps> {
  get description() {
    return this.props.description
  }

  get serviceDate() {
    return this.props.serviceDate
  }

  get vehicleId() {
    return this.props.vehicleId
  }

  get clientId() {
    return this.props.clientId
  }

  get status() {
    return this.props.status
  }

  get price() {
    return this.props.price
  }

  static create(props: ServiceProps, id?: UniqueEntityId) {
    const service = new Service(props, id)

    return service
  }
}
