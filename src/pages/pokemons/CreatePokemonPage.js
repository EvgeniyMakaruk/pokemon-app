import { useEffect, useState } from 'react'
import { fetchPokemonFullInformation, fetchPokemons } from '../../api/pokemonApi'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import { SelectCustom } from '../../common/SelectCustom'
import { deleteObjectKeys, findKeyByValue, getObjectWithoutEmptyFields } from '../../helpers/commonMethods'
import './pokemonStyles.scss'

export const CreatePokemonPage = () => {
  const [pokemons, setPokemons] = useState([])
  const [loadPokemonCount] = useState(24)
  const [filterStart, setFilterStart] = useState(0)
  const [filterEnd, setFilterEnd] = useState(6)
  const filteredPokemons = pokemons.slice(filterStart, filterEnd)
  const [chosenPokemon, setChosenPokemon] = useState({
    chosenColor: '',
    colors: []
  })
  useEffect(() => {
    fetchPokemons(loadPokemonCount).then(res => {
      const promicesPokemons = []
      res.results.forEach(pokemon => {
        promicesPokemons.push(fetchPokemonFullInformation(pokemon.name))
      })
      Promise.all(promicesPokemons).then(pokemons => {
        const colors = getObjectWithoutEmptyFields(pokemons[0]?.sprites)
        setChosenPokemon(
          Object.assign({}, chosenPokemon, {
            chosenColor: Object.values(colors)[0],
            colors

          })
        )
        setPokemons(pokemons)
      })
    })
  }, [])
  console.log(chosenPokemon)
  const choosePokemon = (value) => {
    const colors = getObjectWithoutEmptyFields(value.sprites)
    setChosenPokemon(
      Object.assign({}, chosenPokemon, {
        chosenColor: Object.values(colors)[0],
        colors
      })
    )
  }

  const changePokemonColor = (value) => {
    setChosenPokemon(
      Object.assign({}, chosenPokemon, {
        chosenColor: chosenPokemon.colors[value]
      })
    )
  }

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
              <img src={chosenPokemon.chosenColor} alt=""/>
              <SelectCustom
                  label='Color'
                  values={ Object.keys(deleteObjectKeys(chosenPokemon.colors, ['other', 'versions'])) }
                  handleChange={changePokemonColor}
                  value={findKeyByValue(chosenPokemon.colors, chosenPokemon.pokemonColor)}

              />
          </div>
           <div className='chosenPokemonMain__select-wrapper'>
              <ArrowBackIosNewIcon onClick={() => loadPrev()}/>
              <div className='chosePokemonCard'>
                  {
                      filteredPokemons.map((pokemon, id) => (
                          <img onClick={() => choosePokemon(pokemon)} key={id} src={pokemon?.sprites?.back_default} alt=""/>
                      ))
                  }
              </div>
              <ArrowForwardIosIcon onClick={() => loadNext()}/>
           </div>
      </div>
  )
}
