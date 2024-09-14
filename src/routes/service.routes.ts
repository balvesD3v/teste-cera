import { Router } from 'express'
import { createService } from '../controllers/create-service.controller'
import { getAllService } from '../controllers/get-all-services.controller'
import { getByIdService } from '../controllers/get-by-id-services.controller'
import { deleteService } from '../controllers/delete-service.controller'

const router = Router()

router.post('/services', createService)
router.get('/services', getAllService)
router.get('/services/:id', getByIdService)
router.delete('/services/:id', deleteService)

export default router
