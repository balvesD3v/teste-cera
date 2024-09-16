import { Router } from 'express'
import { CreateServiceController } from '../controllers/create-service.controller'
import { GetAllServiceController } from '../controllers/get-all-services.controller'
import { GetByIdServiceController } from '../controllers/get-by-id-services.controller'
import { DeleteServiceController } from '../controllers/delete-service.controller'
import { UpdateServiceController } from '../controllers/update-service.controller'
import { MongoServiceRepository } from '../database/repositories/service.repository'
import { CreateServiceUseCase } from '@/domain/application/use-cases/create-service.usecase'
import { UpdateServiceUseCase } from '@/domain/application/use-cases/update-service.usecase'
import { DeleteServiceUseCase } from '@/domain/application/use-cases/delete-service.usecase'

const router = Router()
const serviceRepository = new MongoServiceRepository()

const createServiceUseCase = new CreateServiceUseCase(serviceRepository)
const updateServiceUseCase = new UpdateServiceUseCase(serviceRepository)
const deleteServiceUseCase = new DeleteServiceUseCase(serviceRepository)

const createServiceController = new CreateServiceController(
  createServiceUseCase,
)
const updateServiceController = new UpdateServiceController(
  updateServiceUseCase,
)
const deleteServiceController = new DeleteServiceController(
  deleteServiceUseCase,
)

const getAllServiceController = new GetAllServiceController(serviceRepository)
const getByIdServiceController = new GetByIdServiceController(serviceRepository)

router.post('/services', (req, res) =>
  createServiceController.createService(req, res),
)
router.get('/services', (req, res) =>
  getAllServiceController.getAllService(req, res),
)
router.get('/services/:id', (req, res) =>
  getByIdServiceController.getByIdService(req, res),
)
router.delete('/services/:id', (req, res) =>
  deleteServiceController.deleteService(req, res),
)
router.put('/services/:id', (req, res) =>
  updateServiceController.updateService(req, res),
)

export default router
