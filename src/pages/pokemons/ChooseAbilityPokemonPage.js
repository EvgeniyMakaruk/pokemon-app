import { useDispatch, useSelector } from 'react-redux'
import './pokemonStyles.scss'
import { useEffect, useState } from 'react'
import { fetchDataByUrl, fetchPokemonAbilities } from '../../api/pokemonApi'
import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import Typography from '@mui/material/Typography'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { LoaderCustom } from '../../common/LoaderCustom'
import { Button, Checkbox } from '@mui/material'
import { MorePokemonInformationModal } from './components/MorePokemonInformationModal'
import { createdPokemonsAC, currentCreatingPokemonAC } from '../../redux/slices/pokemonSlice'
import { isObjectEmpty, syncLocalStorageAndSlice } from '../../helpers/commonMethods'
import {
  checkMaxAbilities,
  deleteAddedPokemon,
  isCheckBoxChecked,
  isChoseAbilityCheckBoxDisabled
} from './pokemonHelpers'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import { AlertCustom } from '../../common/Alert'
import { useNavigate } from 'react-router-dom'

export const ChooseAbilityPokemonPage = () => {
  const { currentCreatingPokemon, createdPokemons } = useSelector(state => state.pokemons)
  const [abilities, setAbilities] = useState([])
  const [abilitiesPromices, setAbilitiesPromices] = useState([])
  const [isMorePokemonInformationModalOpen, setIsMorePokemonInformationModalOpen] = useState(false)
  const [moreAbilityPokemonInformation, setMoreAbilityPokemonInformation] = useState('')
  const [maxAddedAbilitiesCount, setMaxAddedAbilitiesCount] = useState(3)
  const [addedAbilities, setAddedAbilities] = useState([])
  const [isPokemonAddedAbilities, setIsPokemonAddedAbilities] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    fetchPokemonAbilities().then(res => {
      setAbilities(res.results)
    })
  }, [])
  useEffect(() => {
    Promise.all(abilitiesPromices).then(responseAbilities => {
      const getAbilitiesAndNames = responseAbilities.map((ability) => {
        return {
          abilities: ability.effect_entries,
          name: ability.name
        }
      })
      const objectFromAbilities = getAbilitiesAndNames.reduce((acc, el) => {
        return {
          ...acc,
          [el.name]: el

        }
      }, {})

      const filteredAbilities = abilities.map(ability => {
        if (objectFromAbilities.hasOwnProperty(ability.name)) {
          const some = objectFromAbilities[ability.name]
          return some
        }
        return ability
      })
      setAbilities(filteredAbilities)
    })
  }, [abilitiesPromices])

  const pokemonAbilityShowMoreImformation = (abilityEffect) => {
    setIsMorePokemonInformationModalOpen(true)
    setMoreAbilityPokemonInformation(abilityEffect)
  }

  const deleteAbility = (value) => {
    const arrWithDeletedAbility = deleteAddedPokemon(addedAbilities, value)
    setAddedAbilities(arrWithDeletedAbility)
  }

  const addAbility = (isChecked, value) => {
    if (isChecked) {
      setIsPokemonAddedAbilities(false)
      setAddedAbilities([...addedAbilities, value])
    }
    if (!isChecked) {
      deleteAbility(value)
    }
  }

  const createPokemon = () => {
    if (!checkMaxAbilities(addedAbilities, maxAddedAbilitiesCount)) {
      setIsPokemonAddedAbilities(true)
    }
    if (checkMaxAbilities(addedAbilities, maxAddedAbilitiesCount)) {
      const creatingPokemon = { ...currentCreatingPokemon, abilities: addedAbilities }
      dispatch(createdPokemonsAC(creatingPokemon))
      localStorage.setItem('createdPokemons', JSON.stringify([...createdPokemons, creatingPokemon]))
      navigate(window.location.pathname + '/success')
    }
  }

  return (
      <>
        {checkMaxAbilities(addedAbilities, maxAddedAbilitiesCount) && <AlertCustom status='success' text='Способности выбраны'/>}
        {isPokemonAddedAbilities && <AlertCustom status='info' text={`Выберите способности для покемона ${maxAddedAbilitiesCount - addedAbilities.length}`}/>}
      <div className='abilityPage'>
        <div className='abilityPage__chosenAbilities'>
           {
            addedAbilities.map((ability, id) => (
                <div className='abilityPage__chosenAbilities__card' key={id}>

                  <div>
                    <p>{ability.short_effect}</p>
                  </div>
                  <div onClick={() => deleteAbility(ability)}>
                    <DeleteOutlineIcon/>
                  </div>
                </div>
            ))
           }
        </div>

        <div className='abilityPage__pokemonWrapp'>
        <div className='abilityPage__chosenPokemon'>
          <MorePokemonInformationModal
              open={isMorePokemonInformationModalOpen}
              setOpen={setIsMorePokemonInformationModalOpen}
              value='Pokemon effect'
              content={moreAbilityPokemonInformation}
          />
          <p>{currentCreatingPokemon.chosenName}</p>
          <img src={currentCreatingPokemon.chosenColor} alt=""/>
        </div>
        <div className='abilityPage__selectAbility'>
              {
                abilities.map((ability, id) => (
                    <Accordion style={{ margin: '0px' }} key={id}>
                      <AccordionSummary
                          onClick={() => {
                            if (ability.url) {
                              setAbilitiesPromices([...abilitiesPromices, fetchDataByUrl(ability.url)])
                            }
                          }}
                          expandIcon={<ExpandMoreIcon />}
                          aria-controls="panel1a-content"
                          id="panel1a-header"
                      >
                        <Typography>{ability.name}</Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        {!ability.abilities && <LoaderCustom customStyles={{ display: 'flex', justifyContent: 'center' }}/>}
                        {ability.abilities && <div>
                          {
                            ability.abilities.map((ability, id) => (
                                <div className='abilityCard' key={id}>
                                  <div className='abilityCard__text'>
                                    <Checkbox
                                        onClick={(e) => addAbility(e.target.checked, ability)}
                                        checked={isCheckBoxChecked(addedAbilities, ability.effect)}

                                        disabled={isChoseAbilityCheckBoxDisabled(ability.effect, addedAbilities, maxAddedAbilitiesCount)}
                                    />
                                    <p>{ability.short_effect}</p>
                                  </div>
                                  <Button onClick={() => pokemonAbilityShowMoreImformation(ability.effect)} >more</Button>
                                </div>
                            ))
                          }
                        </div>}
                      </AccordionDetails>
                    </Accordion>
                ))
              }
          </div>
        </div>
          <Button onClick={() => createPokemon()} className='createbButton' variant='contained'>Создать</Button>
      </div>
      </>
  )
}
