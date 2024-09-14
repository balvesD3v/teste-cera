import { Router } from 'express'
import { createService } from '../controllers/create-service.controller'
import { ServiceGetAllController } from '../controllers/get-all-services.controller'
import { getByIdService } from '../controllers/get-by-id-services.controller'
import { deleteService } from '../controllers/delete-service.controller'
import { updateService } from '../controllers/update-service.controller'

const router = Router()

const serviceGetAllController = new ServiceGetAllController()

router.post('/services', createService)
router.get('/services', (req, res) =>
  serviceGetAllController.getAllService(req, res),
)
router.get('/services/:id', getByIdService)
router.delete('/services/:id', deleteService)
router.put('/services/:id', updateService)

export default router
