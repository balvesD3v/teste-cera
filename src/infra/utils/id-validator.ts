export function isValidId(id: string): boolean {
  const objectIdRegex = /^[0-9a-fA-F]{24}$/
  const uuidRegex =
    /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/
  return objectIdRegex.test(id) || uuidRegex.test(id)
}
