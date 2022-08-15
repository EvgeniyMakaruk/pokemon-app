import axios from 'axios'
import { instance } from './globalInstance'

export const fetchPokemons = async () => {
  return await instance.get('pokemon?limit=10').then(res => {
    return res.data
  })
}
export const fetchPokemonFullInformation = async (pokemonName) => {
  return await instance.get(`pokemon/${pokemonName}`).then(res => {
    return res.data
  })
}
