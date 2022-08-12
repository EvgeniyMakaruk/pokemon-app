import {createSlice} from "@reduxjs/toolkit";

const pokemonSlice = createSlice({
    name:'pokemon',
    initialState:{
        pokemons: [],

    },
    reducers:{
        getPokemons:(state, action)=>{
            state.pokemons = action.payload
        },

    }
})

export const { getPokemons } = pokemonSlice.actions;
export default pokemonSlice.reducer;