import { useEffect, useState } from 'react'
import { fetchPokemonFullInformation, fetchPokemons } from '../../api/pokemonApi'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import { SelectCustom } from '../../common/SelectCustom'
import { deleteObjectKeys, findKeyByValue, getObjectWithoutEmptyFields, isKeyExist } from '../../helpers/commonMethods'
import { Button, TextField } from '@mui/material'
import './pokemonStyles.scss'
import { useDispatch } from 'react-redux'
import { currentCreatingPokemonAC } from '../../redux/slices/pokemonSlice'
import { useNavigate } from 'react-router-dom'
import { Alert, AlertCustom } from '../../common/Alert'

export const CreatePokemonPage = () => {
  const [pokemons, setPokemons] = useState([])
  const [loadPokemonCount] = useState(24)
  const [filterStart, setFilterStart] = useState(0)
  const [filterEnd, setFilterEnd] = useState(6)
  const filteredPokemons = pokemons.slice(filterStart, filterEnd)
  const [chosenPokemon, setChosenPokemon] = useState({
    chosenColor: '',
    chosenName: '',
    colors: []

  })
  const [isValidateFormError, setIsValidateFormError] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()

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

  const choosePokemon = (value) => {
    const colors = getObjectWithoutEmptyFields(value.sprites)
    setChosenPokemon(
      Object.assign({}, chosenPokemon, {
        chosenColor: Object.values(colors)[0],
        colors
      })
    )
  }

  const savePokemon = () => {
    const isDataRight = isKeyExist(chosenPokemon, 'chosenName')
    console.log(isDataRight)
    if (isDataRight) {
      dispatch(currentCreatingPokemonAC(chosenPokemon))
      navigate(window.location.pathname + '/choose-ability')
    }
    if (!isDataRight) {
      setIsValidateFormError(true)
    }
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
          {isValidateFormError && <AlertCustom/>}
          <div className='chosenPokemonMain__pokemon'>
              <div className='chosenPokemonMain__pokemon__form'>
                  <SelectCustom
                      label='Color'
                      values={ Object.keys(deleteObjectKeys(chosenPokemon.colors, ['other', 'versions'])) }
                      handleChange={changePokemonColor}
                      value={findKeyByValue(chosenPokemon.colors, chosenPokemon.pokemonColor)}

                  />
                  <TextField id="outlined-basic" label="Name" variant="standard" value={chosenPokemon.chosenName} onChange={(e) => {
                    setChosenPokemon(
                      Object.assign({}, chosenPokemon, {
                        chosenName: e.target.value
                      })
                    )
                  }}

                   />
              </div>
              <img src={chosenPokemon.chosenColor} alt=""/>

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
          <Button onClick={() => savePokemon()} className='createButton' variant='contained'>Создать</Button>
      </div>
  )
}
