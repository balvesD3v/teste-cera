import { UniqueEntityId } from './unique-entity-id'

export abstract class Entity<Props> {
  private _id: UniqueEntityId
  protected props: Props

  constructor(props: Props, id?: UniqueEntityId) {
    this._id = id ?? new UniqueEntityId()
    this.props = props
  }

  getId(): string {
    return this._id.toValue()
  }

  get id() {
    return this._id
  }

  public equals(entity: Entity<unknown>): boolean {
    if (entity === this) {
      return true
    }

    if (entity.id.toValue() === this._id.toValue()) {
      return true
    }

    return false
  }
}
