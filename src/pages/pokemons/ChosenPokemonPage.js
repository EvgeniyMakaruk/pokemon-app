import {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {fetchPokemonFullInformation} from "../../api/pokemonApi";

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
        <div>ChosenPokemonPage</div>
    )
}