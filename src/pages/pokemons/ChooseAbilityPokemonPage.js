import { useSelector } from 'react-redux'
import './pokemonStyles.scss'
import { useEffect, useState } from 'react'
import { fetchDataByUrl, fetchPokemonAbilities } from '../../api/pokemonApi'
import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import Typography from '@mui/material/Typography'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'

export const ChooseAbilityPokemonPage = () => {
  const { currentCreatingPokemon } = useSelector(state => state.pokemons)
  const [abilities, setAbilities] = useState([])
  const [abilitiesPromices, setAbilitiesPromices] = useState([])

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

  return (
      <div className='abilityPage'>
        <div className='abilityPage__chosenPokemon'>
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
                          {/* some content */}
                          </AccordionDetails>
                      </Accordion>
                  ))
              }
          </div>
      </div>
  )
}
