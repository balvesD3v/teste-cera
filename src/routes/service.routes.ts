import { Router } from 'express'
import { CreateServiceController } from '../controllers/create-service.controller'
import { GetAllServiceController } from '../controllers/get-all-services.controller'
import { GetByIdServiceController } from '../controllers/get-by-id-services.controller'
import { DeleteServiceController } from '../controllers/delete-service.controller'
import { UpdateServiceController } from '../controllers/update-service.controller'
import { ServiceRepository } from '../repositories/service.repository'

const router = Router()
const serviceRepository = new ServiceRepository()

const getAllServiceController = new GetAllServiceController(serviceRepository)
const createServiceController = new CreateServiceController(serviceRepository)
const deleteServiceController = new DeleteServiceController(serviceRepository)
const getByIdServiceController = new GetByIdServiceController(serviceRepository)
const updateServiceController = new UpdateServiceController(serviceRepository)

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
