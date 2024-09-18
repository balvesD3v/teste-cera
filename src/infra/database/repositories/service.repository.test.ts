import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { MongoMemoryServer } from 'mongodb-memory-server'
import mongoose from 'mongoose'
import { MongoServiceRepository } from './service.repository'
import { Service } from 'src/domain/enterprise/entities/service'
import { UniqueEntityId } from 'src/core/entities/unique-entity-id'

let mongoServer: MongoMemoryServer

let mongoServiceRepository: MongoServiceRepository

beforeEach(async () => {
  mongoServer = await MongoMemoryServer.create()
  const uri = mongoServer.getUri()

  await mongoose.connect(uri)

  mongoServiceRepository = new MongoServiceRepository()
})

afterEach(async () => {
  await mongoose.disconnect()
  await mongoServer.stop()
})

describe('MongoServiceRepository', () => {
  it('should create and retrieve a service', async () => {
    const service = Service.create({
      description: 'Service Description',
      serviceDate: new Date(),
      vehicleId: new UniqueEntityId('vehicle-123'),
      clientId: new UniqueEntityId('client-123'),
      status: 'pending',
      price: 100,
    })

    await mongoServiceRepository.create(service)

    const foundService = await mongoServiceRepository.findById(
      service.id.toString(),
    )

    expect(foundService).toBeTruthy()
    expect(foundService?.description).toBe(service.description)
  })

  it('should update a service', async () => {
    const service = Service.create({
      description: 'Initial Description',
      serviceDate: new Date(),
      vehicleId: new UniqueEntityId('vehicle-123'),
      clientId: new UniqueEntityId('client-123'),
      status: 'pending',
      price: 100,
    })

    await mongoServiceRepository.create(service)

    service.updateDescription('Updated Description')
    service.updatePrice(150)

    await mongoServiceRepository.update(service)

    const updatedService = await mongoServiceRepository.findById(
      service.id.toString(),
    )

    expect(updatedService).toBeTruthy()
    expect(updatedService?.description).toBe('Updated Description')
    expect(updatedService?.price).toBe(150)
  })

  it('should delete a service', async () => {
    const service = Service.create({
      description: 'Service Description',
      serviceDate: new Date(),
      vehicleId: new UniqueEntityId('vehicle-123'),
      clientId: new UniqueEntityId('client-123'),
      status: 'pending',
      price: 100,
    })

    await mongoServiceRepository.create(service)

    await mongoServiceRepository.delete(service)

    const deletedService = await mongoServiceRepository.findById(
      service.id.toString(),
    )

    expect(deletedService).toBeNull()
  })

  it('should retrieve all services', async () => {
    const service1 = Service.create({
      description: 'Service 1',
      serviceDate: new Date(),
      vehicleId: new UniqueEntityId('vehicle-123'),
      clientId: new UniqueEntityId('client-123'),
      status: 'pending',
      price: 100,
    })

    const service2 = Service.create({
      description: 'Service 2',
      serviceDate: new Date(),
      vehicleId: new UniqueEntityId('vehicle-456'),
      clientId: new UniqueEntityId('client-456'),
      status: 'completed',
      price: 200,
    })

    await mongoServiceRepository.create(service1)
    await mongoServiceRepository.create(service2)

    const services = await mongoServiceRepository.findAll()

    expect(services).toHaveLength(2)
    expect(services?.[0].description).toBe('Service 1')
    expect(services?.[1].description).toBe('Service 2')
  })
})
