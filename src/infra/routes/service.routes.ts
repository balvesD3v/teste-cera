import { Router } from 'express'
import { CreateServiceController } from '../controllers/create-service.controller'
import { GetAllServiceController } from '../controllers/get-all-services.controller'
import { GetByIdServiceController } from '../controllers/get-by-id-services.controller'
import { DeleteServiceController } from '../controllers/delete-service.controller'
import { UpdateServiceController } from '../controllers/update-service.controller'
import { MongoServiceRepository } from '../database/repositories/service.repository'
import { CreateServiceUseCase } from '../../domain/application/use-cases/create-service.usecase'
import { UpdateServiceUseCase } from '../../domain/application/use-cases/update-service.usecase'
import { DeleteServiceUseCase } from '../../domain/application/use-cases/delete-service.usecase'
import { GetAllServiceUseCase } from '../../domain/application/use-cases/get-all-service.usecase'
import { GetByIdServiceUseCase } from '../../domain/application/use-cases/get-by-id-service.usecase'
import { GetServicesByFiltersUseCase } from '../../domain/application/use-cases/get-by-filters-service.usecase'
import { GetServicesByFiltersController } from '../controllers/get-by-filters-service.controller'

const router = Router()
const serviceRepository = new MongoServiceRepository()

const createServiceUseCase = new CreateServiceUseCase(serviceRepository)
const updateServiceUseCase = new UpdateServiceUseCase(serviceRepository)
const deleteServiceUseCase = new DeleteServiceUseCase(serviceRepository)
const getAllServiceUseCase = new GetAllServiceUseCase(serviceRepository)
const getByIdServiceUseCase = new GetByIdServiceUseCase(serviceRepository)
const getServicesByFiltersUseCase = new GetServicesByFiltersUseCase(
  serviceRepository,
)

const createServiceController = new CreateServiceController(
  createServiceUseCase,
)
const updateServiceController = new UpdateServiceController(
  updateServiceUseCase,
)
const deleteServiceController = new DeleteServiceController(
  deleteServiceUseCase,
)
const getAllServiceController = new GetAllServiceController(
  getAllServiceUseCase,
)
const getByIdServiceController = new GetByIdServiceController(
  getByIdServiceUseCase,
)
const getServicesByFiltersController = new GetServicesByFiltersController(
  getServicesByFiltersUseCase,
)

router.post('/services', (req, res) => createServiceController.handle(req, res))
router.get('/services', (req, res) => getAllServiceController.handle(req, res))
router.get('/servicesfiltered', (req, res) =>
  getServicesByFiltersController.handle(req, res),
)
router.get('/services/:id', (req, res) =>
  getByIdServiceController.handle(req, res),
)
router.delete('/services/:id', (req, res) =>
  deleteServiceController.handle(req, res),
)
router.put('/services/:id', (req, res) =>
  updateServiceController.handle(req, res),
)

export default router
