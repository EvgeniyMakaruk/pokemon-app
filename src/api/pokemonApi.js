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

export const fetchPokemonAbilities = async () => {
  return await instance.get('ability').then(res => {
    return res.data
  })
}

export const fetchDataByUrl = async (url) => {
  return await instance.get(`${url}`).then(res => {
    return res.data
  })
}
