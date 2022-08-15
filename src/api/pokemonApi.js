import axios from 'axios'
import { instance } from './globalInstance'

export const fetchPokemons = async (limit) => {
  return await instance.get(`pokemon?limit=${limit}`).then(res => {
    return res.data
  })
}
export const fetchPokemonFullInformation = async (pokemonName) => {
  return await instance.get(`pokemon/${pokemonName}`).then(res => {
    return res.data
  })
}
