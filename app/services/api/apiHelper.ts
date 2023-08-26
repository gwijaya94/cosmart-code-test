export const getProcessedResponse = (obj: object) => {
  const newObj: object = {}

  Object.keys(obj).forEach((item) => {
    const newKey = item.replace(/(_\w)/g, (k) => k[1].toUpperCase())
    newObj[newKey] = obj[item]
  })
  return newObj
}
