import { useEffect } from 'react'
import { fetchPokemons } from '../../api/pokemonApi'
import './pokemonStyles.scss'
import { Box, Grid } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { getPokemonsAC } from '../../redux/slices/pokemonSlice'
import { PokemonCardHoc } from '../../hocs/PokemonCardHoc'

export const PokemonsPage = () => {
  const dispatch = useDispatch()
  const { pokemons } = useSelector(state => state.pokemons)

  useEffect(() => {
    fetchPokemons(9).then(pokemons => {
      dispatch(getPokemonsAC(pokemons.results))
    })
  }, [])
  return (
        <Box>
            <Grid container spacing={3} className='pokemon' >
                {
                    pokemons.map((pokemon, id) => (
                        <Grid item key={id} xs={12} sm={6} md={4} lg={3} xl={3} >
                            <PokemonCardHoc pokemon={pokemon}/>
                        </Grid>
                    ))
                }
            </Grid>
        </Box>
  )
}
