import {configureStore} from "@reduxjs/toolkit";
import PokemonSlice from "./slices/pokemonSlice";

const store = configureStore({
    reducer:{
        pokemons: PokemonSlice
    }
})

export  default  store