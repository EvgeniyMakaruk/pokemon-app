import {useEffect, useState} from "react";
import {fetchPokemons} from "../../api/pokemonApi";

import './pokemonStyles.scss'
import {PokemonCard} from "./components/PokemonCard";
import {Box, Grid} from "@mui/material";

export const PokemonsPage = () => {
   const [pokemons, setPokemons] = useState([])

    useEffect(()=> {
        fetchPokemons().then(pokemons => {
            setPokemons(pokemons.results)
        })
    }, [])

    return (
        <Box>
            <Grid container spacing={3} className='pokemon' >
                {
                    pokemons.map((pokemon, id) => (
                        <Grid item key={id} xs={12} sm={6} md={4} lg={3} xl={3} >
                            <PokemonCard  pokemon={pokemon}/>
                        </Grid>
                    ))
                }
            </Grid>
        </Box>
    )
}