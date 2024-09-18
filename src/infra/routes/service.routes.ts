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

const router = Router()
const serviceRepository = new MongoServiceRepository()

const createServiceUseCase = new CreateServiceUseCase(serviceRepository)
const updateServiceUseCase = new UpdateServiceUseCase(serviceRepository)
const deleteServiceUseCase = new DeleteServiceUseCase(serviceRepository)
const getAllServiceUseCase = new GetAllServiceUseCase(serviceRepository)
const getByIdServiceUseCase = new GetByIdServiceUseCase(serviceRepository)

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

/**
 * @swagger
 * /services:
 *   post:
 *     summary: Cria um novo serviço
 *     tags:
 *       - Serviços
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - description
 *               - serviceDate
 *               - vehicleId
 *               - clientId
 *               - status
 *               - price
 *             properties:
 *               description:
 *                 type: string
 *                 description: Descrição do serviço
 *                 example: "Troca de óleo"
 *               serviceDate:
 *                 type: string
 *                 format: date-time
 *                 description: Data do serviço
 *                 example: "2023-09-18T10:00:00Z"
 *               vehicleId:
 *                 type: string
 *                 description: ID do veículo
 *                 example: "1234567890"
 *               clientId:
 *                 type: string
 *                 description: ID do cliente
 *                 example: "0987654321"
 *               status:
 *                 type: string
 *                 description: Status do serviço
 *                 example: "pendente"
 *               price:
 *                 type: number
 *                 description: Preço do serviço
 *                 example: 250.00
 *     responses:
 *       201:
 *         description: Serviço criado com sucesso
 *       400:
 *         description: Erro na validação dos dados fornecidos
 */
router.post('/services', (req, res) => createServiceController.handle(req, res))

/**
 * @swagger
 * /services:
 *   get:
 *     summary: Retorna todos os serviços
 *     tags:
 *       - Serviços
 *     responses:
 *       200:
 *         description: Lista de serviços
 */
router.get('/services', (req, res) => getAllServiceController.handle(req, res))

/**
 * @swagger
 * /services/{id}:
 *   get:
 *     summary: Retorna um serviço pelo ID
 *     tags:
 *       - Serviços
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do serviço
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Serviço retornado com sucesso
 *       404:
 *         description: Serviço não encontrado
 */
router.get('/services/:id', (req, res) =>
  getByIdServiceController.handle(req, res),
)

/**
 * @swagger
 * /services/{id}:
 *   delete:
 *     summary: Exclui um serviço pelo ID
 *     tags:
 *       - Serviços
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do serviço
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Serviço excluído com sucesso
 *       404:
 *         description: Serviço não encontrado
 */
router.delete('/services/:id', (req, res) =>
  deleteServiceController.handle(req, res),
)

/**
 * @swagger
 * /services/{id}:
 *   put:
 *     summary: Atualiza um serviço pelo ID
 *     tags:
 *       - Serviços
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do serviço
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               description:
 *                 type: string
 *                 description: Descrição do serviço
 *                 example: "Troca de óleo"
 *               serviceDate:
 *                 type: string
 *                 format: date-time
 *                 description: Data do serviço
 *               vehicleId:
 *                 type: string
 *                 description: ID do veículo
 *               clientId:
 *                 type: string
 *                 description: ID do cliente
 *               status:
 *                 type: string
 *                 description: Status do serviço
 *               price:
 *                 type: number
 *     responses:
 *       200:
 *         description: Serviço atualizado com sucesso
 *       404:
 *         description: Serviço não encontrado
 */
router.put('/services/:id', (req, res) =>
  updateServiceController.handle(req, res),
)

export default router
