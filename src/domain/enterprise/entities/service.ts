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

  updateDescription(description: string) {
    this.props.description = description
  }

  updateServiceDate(serviceDate: Date) {
    this.props.serviceDate = serviceDate
  }

  updateVehicleId(vehicleId: UniqueEntityId) {
    this.props.vehicleId = vehicleId
  }

  updateClientId(clientId: UniqueEntityId) {
    this.props.clientId = clientId
  }

  updateStatus(status: 'pending' | 'completed' | 'canceled') {
    this.props.status = status
  }

  updatePrice(price: number) {
    this.props.price = price
  }

  static create(props: ServiceProps, id?: UniqueEntityId) {
    return new Service(props, id)
  }
}
