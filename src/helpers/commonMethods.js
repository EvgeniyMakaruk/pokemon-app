import { currentCreatingPokemonAC } from '../redux/slices/pokemonSlice'
import store from '../redux/store'

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

export const isKeyValueExist = (obj, key) => {
  return Boolean(obj[key])
}

export const isObjectEmpty = (obj) => {
  for (const key in obj) {
    return false
  }
  return true
}

export const syncLocalStorageAndSlice = (valueToSave, keyToSave) => {
  if (!isObjectEmpty(valueToSave)) {
    localStorage.setItem(keyToSave, JSON.stringify(valueToSave))
  }
  if (isObjectEmpty(valueToSave)) {
    store.dispatch(currentCreatingPokemonAC(JSON.parse(localStorage.getItem(keyToSave))))
  }
}
