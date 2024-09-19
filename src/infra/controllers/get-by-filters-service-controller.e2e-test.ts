import { Request, Response } from 'express'
import { GetServicesByFiltersUseCase } from 'src/domain/application/use-cases/get-by-filters-service.usecase'

export class GetServicesByFiltersController {
  constructor(
    private readonly getServicesByFiltersUseCase: GetServicesByFiltersUseCase,
  ) {}

  async handle(req: Request, res: Response) {
    const { clientId, vehicleId, status } = req.query

    const result = await this.getServicesByFiltersUseCase.execute({
      clientId: clientId as string,
      vehicleId: vehicleId as string,
      status: status as string,
    })

    if (result.isLeft()) {
      const error = result.value
      return res.status(400).json({ message: error.message })
    }

    const services = result.value.services.map((service) => ({
      id: service.getId().toString(),
      clientId: service.clientId.toValue(),
      vehicleId: service.vehicleId.toValue(),
      description: service.description,
      price: service.price.toString(),
      serviceDate: service.serviceDate.toISOString(),
      status: service.status,
    }))

    return res.status(200).json(services)
  }
}
