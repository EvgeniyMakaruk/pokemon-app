import {useEffect, useState} from "react";
import {fetchPokemonImage} from "../../../api/pokemonApi";
import '../pokemonStyles.scss'

export const PokemonCard = ({ pokemon}) => {
    const [currentPokemon, setCurrentPokemon] = useState({})
    useEffect(() => {
        fetchPokemonImage(pokemon.name).then(pokemon=>{
            setCurrentPokemon(pokemon)
        })
    },[])

    return (
        <div className="pokemonCard" >
            <img src={currentPokemon?.sprites?.back_default} alt=""/>
            <p>{pokemon.name}</p>
        </div>
    )
}