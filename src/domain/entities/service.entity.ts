import mongoose from 'mongoose'

export class Service {
  constructor(
    public readonly description: string,
    public readonly serviceDate: Date,
    public readonly vehicleId: mongoose.Types.ObjectId,
    public readonly clientId: mongoose.Types.ObjectId,
    public readonly status: 'pending' | 'completed' | 'canceled',
    public readonly price: number,
    public readonly id?: string,
  ) {
    this.validate()
  }

  private validate(): void {
    if (!this.description || this.description.trim().length === 0) {
      throw new Error('Descrição é obrigatória')
    }

    if (
      !(this.serviceDate instanceof Date) ||
      isNaN(this.serviceDate.getTime())
    ) {
      throw new Error('Data inválida')
    }

    if (!this.vehicleId || !this.clientId) {
      throw new Error('ID do veículo e ID do cliente são obrigatórios')
    }

    const validStatuses = ['pending', 'completed', 'canceled']
    if (!validStatuses.includes(this.status)) {
      throw new Error('Status inválido')
    }

    if (this.price <= 0) {
      throw new Error('Preço deve ser um valor positivo')
    }
  }
}
