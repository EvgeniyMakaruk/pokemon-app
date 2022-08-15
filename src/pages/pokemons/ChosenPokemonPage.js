import {useEffect, useState} from "react";
import {fetchPokemonFullInformation} from "../../api/pokemonApi";
import './pokemonStyles.scss'

export const ChosenPokemonPage = () =>{
    const [pokemonName, setPokemonName] = useState(window.location.pathname.substr(window.location.pathname.lastIndexOf('/')+1))
    const [chosenPokemon, setChosenPokemon] = useState({})


    useEffect(()=>{
        fetchPokemonFullInformation(pokemonName).then(pokemon=>{
            setChosenPokemon(pokemon)
        })
    },[])
    console.log('setChosenPokemon',chosenPokemon)

    return (
        <div className='chosenPokemon'>
            <img src={chosenPokemon?.sprites?.back_default} alt="currentPokemon"/>
            <p className='chosenPokemon__name'>
               Name:
              <span> {chosenPokemon.name}</span>
            </p>
        </div>
    )
}