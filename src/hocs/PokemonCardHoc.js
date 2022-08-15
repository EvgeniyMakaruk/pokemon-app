
import { useNavigate } from 'react-router-dom'
import { fetchPokemonFullInformation } from '../api/pokemonApi'
import { PokemonCard } from '../pages/pokemons/components/PokemonCard'
import { useEffect, useState } from 'react'

export const PokemonCardHoc = ({ pokemon }) => {
  const [fullPokemonInformation, setFullPokemonInformation] = useState({})
  const navigate = useNavigate()

  useEffect(() => {
    fetchPokemonFullInformation(pokemon.name).then(pokemon => {
      setFullPokemonInformation(pokemon)
    })
  }, [])

  const chosePokemon = () => {
    navigate(`/pokemon/${fullPokemonInformation.name}`)
  }
  return (<PokemonCard onClickHandler={chosePokemon} fullPokemonInformation={fullPokemonInformation} pokemon={pokemon}/>)
}
