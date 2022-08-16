import { createSlice } from '@reduxjs/toolkit'

const pokemonSlice = createSlice({
  name: 'pokemon',
  initialState: {
    pokemons: [],
    createdPokemons: [],
    currentCreatingPokemon: {}

  },
  reducers: {
    getPokemonsAC: (state, action) => {
      state.pokemons = action.payload
    },
    currentCreatingPokemonAC: (state, action) => {
      state.currentCreatingPokemon = action.payload
    }

  }
})

export const { getPokemonsAC, currentCreatingPokemonAC } = pokemonSlice.actions
export default pokemonSlice.reducer
