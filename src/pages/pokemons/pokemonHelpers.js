export const checkMaxAbilities = (arr, maxCount) => {
  return arr.length >= maxCount
}

export const deleteAddedPokemon = (addedAbilities, value) => {
  return addedAbilities.filter(ability => ability.effect !== value.effect)
}

export const isChoseAbilityCheckBoxDisabled = (value, arr, maxAbilities) => {
  if (arr.map(el => el.effect).includes(value)) {
    return false
  }
  if (checkMaxAbilities(arr, maxAbilities)) {
    return true
  }
}

export const isCheckBoxChecked = (arr, value) => {
  return arr.map(el => el.effect).includes(value)
}
