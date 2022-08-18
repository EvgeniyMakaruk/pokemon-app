export const isChoseAbilityCheckBoxDisabled = (value, arr, maxAbilities) => {
  if (arr.map(el => el.effect).includes(value)) {
    return false
  }
  if (arr.length >= maxAbilities) {
    return true
  }
}

export const isCheckBoxChecked = (arr, value) => {
  return arr.map(el => el.effect).includes(value)
}
