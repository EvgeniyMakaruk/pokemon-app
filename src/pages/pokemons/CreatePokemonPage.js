import { useEffect, useState } from 'react'
import { fetchPokemonFullInformation, fetchPokemons } from '../../api/pokemonApi'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import './pokemonStyles.scss'
import { SelectCustom } from '../../common/SelectCustom'
import { deleteNullObjectKeys, deleteObjectKeys, getObjectWithoutEmptyFields } from '../../helpers/commonMethods'
import { Button } from '@mui/material'

export const CreatePokemonPage = () => {
  const [pokemons, setPokemons] = useState([])
  const [loadPokemonCount] = useState(24)
  const [filterStart, setFilterStart] = useState(0)
  const [filterEnd, setFilterEnd] = useState(6)
  const filteredPokemons = pokemons.slice(filterStart, filterEnd)
  const [chosenPokemon, setChosenPokemon] = useState({
    img: '',
    colors: []
  })
  console.log('chosen', chosenPokemon.colors)
  useEffect(() => {
    fetchPokemons(loadPokemonCount).then(res => {
      const promicesPokemons = []
      res.results.forEach(pokemon => {
        promicesPokemons.push(fetchPokemonFullInformation(pokemon.name))
      })
      Promise.all(promicesPokemons).then(pokemons => {
        setChosenPokemon(
          Object.assign({}, chosenPokemon, {
            colors: getObjectWithoutEmptyFields(pokemons[0]?.sprites)

          })
        )
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
      <div className='chosenPokemonMain'>
          <div className='chosenPokemonMain__pokemon'>
              <img src={chosenPokemon.colors?.back_default} alt=""/>
              <SelectCustom
                  label='Color'
                  values={ deleteObjectKeys(chosenPokemon.colors, ['other', 'versions']) }
              />
          </div>
           <div className='chosenPokemonMain__select-wrapper'>
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
      </div>
  )
}
