import { useEffect, useState } from 'react'
import { fetchPokemonFullInformation, fetchPokemons } from '../../api/pokemonApi'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import './pokemonStyles.scss'

export const CreatePokemonPage = () => {
  const [pokemons, setPokemons] = useState([])
  const [loadPokemonCount, setLoadPokemonCount] = useState(24)
  const [filterStart, setFilterStart] = useState(0)
  const [filterEnd, setFilterEnd] = useState(6)

  const filteredPokemons = pokemons.slice(filterStart, filterEnd)

  useEffect(() => {
    fetchPokemons(loadPokemonCount).then(res => {
      const promicesPokemons = []
      res.results.forEach(pokemon => {
        promicesPokemons.push(fetchPokemonFullInformation(pokemon.name))
      })
      Promise.all(promicesPokemons).then(pokemons => {
        setPokemons(pokemons)
      })
    })
  }, [])

  const loadNext = () => {
    if (filterEnd + 3 <= loadPokemonCount) {
      setFilterStart(filterStart + 3)
      setFilterEnd(filterEnd + 3)
    }
  }

  const loadPrev = () => {
    if (filterStart > 0) {
      setFilterStart(filterStart - 3)
      setFilterEnd(filterEnd - 3)
    }
  }
  return (
      <div className='chosePokemonCardWrapper'>
        <ArrowBackIosNewIcon onClick={() => loadPrev()}/>
        <div className='chosePokemonCard'>
          {
            filteredPokemons.map((pokemon, id) => (
                <img key={id} src={pokemon?.sprites?.back_default} alt=""/>
            ))
          }
        </div>
        <ArrowForwardIosIcon onClick={() => loadNext()}/>
      </div>
  )
}
