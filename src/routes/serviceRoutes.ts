import { Router } from 'express'
import { createService } from '../controllers/service.controller'

const router = Router()

router.post('/services', createService)

export default router
