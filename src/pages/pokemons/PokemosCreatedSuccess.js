import './pokemonStyles.scss'
import { useSelector } from 'react-redux'
import { useState } from 'react'
import { Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'

export const PokemosCreatedSuccess = () => {
  const createdPokemons = useSelector(({ pokemons }) => pokemons.createdPokemons)
  const [lastCreatedPokemon, setlastCreatedPokemon] = useState(createdPokemons[createdPokemons.length - 1])
  const navigate = useNavigate()

  return (
        <div className='pokemonCreatedSuccess'>
          <div className='pokemonCreatedSuccess__card'>
              <p className="pokemonCreatedSuccess__card__text">
                  PokemosCreatedSuccess
              </p>
              <div className='pokemonCreatedSuccess__card__pokemon'>
                  <p className='name'>{lastCreatedPokemon.chosenName}</p>
                  <img className='image' src={lastCreatedPokemon.chosenColor} alt=""/>
                  <p className='abilitiesTitle'>Abilities</p>
                  <div className='abilities'>
                      {
                          lastCreatedPokemon.abilities.map((ability, index) => (
                              <div className='abilities__ability' key={index}>
                                  {ability.short_effect}
                              </div>
                          ))
                      }
                  </div>
              </div>
              <div className='pokemonCreatedSuccess__card__buttonGroup'>
                  <Button color='primary' variant='outlined' onClick={() => navigate('/')}>На главную</Button>
                  <Button color='primary' variant='outlined' onClick={() => navigate('/my-pokemons')}>Мои покемоны</Button>
              </div>
          </div>
        </div>
  )
}
