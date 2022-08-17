import { useSelector } from 'react-redux'
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

export const ChooseAbilityPokemonPage = () => {
  const { currentCreatingPokemon } = useSelector(state => state.pokemons)
  const [abilities, setAbilities] = useState([])
  const [abilitiesPromices, setAbilitiesPromices] = useState([])
  const [isMorePokemonInformationModalOpen, setIsMorePokemonInformationModalOpen] = useState(false)
  const [moreAbilityPokemonInformation, setMoreAbilityPokemonInformation] = useState('')

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
  console.log()
  return (
      <div className='abilityPage'>
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
                                        <Checkbox defaultChecked />
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
  )
}
