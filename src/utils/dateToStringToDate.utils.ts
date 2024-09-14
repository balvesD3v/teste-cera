export const dateStringToDate = (
  dateString: string | undefined,
): Date | undefined => {
  if (dateString === undefined) return undefined
  const date = new Date(dateString)
  return isNaN(date.getTime()) ? undefined : date
}
