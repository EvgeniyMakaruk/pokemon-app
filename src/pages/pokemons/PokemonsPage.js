import {useEffect, useState} from "react";
import {fetchPokemons} from "../../api/pokemonApi";

import './pokemonStyles.scss'
import {PokemonCard} from "./components/PokemonCard";
import {Box, Grid} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {getPokemons} from "../../redux/slices/pokemonSlice";

export const PokemonsPage = () => {
    const dispatch = useDispatch()
    const {pokemons} = useSelector(state=>state.pokemons)

    useEffect(()=> {
        fetchPokemons().then(pokemons => {
        dispatch(getPokemons(pokemons.results))
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