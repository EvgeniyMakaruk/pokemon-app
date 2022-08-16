export const deleteObjectKeys = (obj, arrKeysToDelete) => {
  arrKeysToDelete.forEach(remove => {
    delete obj[remove]
  })
  return obj
}

export const getObjectWithoutEmptyFields = (obj) => {
  const arrFromObj = Object.entries(obj)
  return arrFromObj.reduce((state, [property, value]) => {
    return value === null ? state : { ...state, [property]: value }
  }, {})
}

export const findKeyByValue = (object, value) => {
  return Object.keys(object).find(key => object[key] === value)
}