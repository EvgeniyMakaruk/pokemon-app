import {useEffect, useState} from "react";
import {fetchPokemonFullInformation} from "../../../api/pokemonApi";
import '../pokemonStyles.scss'
import { useNavigate } from 'react-router-dom';

export const PokemonCard = ({ pokemon}) => {

    const [fullPokemonInformation, setFullPokemonInformation] = useState({})
    const navigate = useNavigate();

    useEffect(() => {
        fetchPokemonFullInformation(pokemon.name).then(pokemon=>{
            setFullPokemonInformation(pokemon)
        })
    },[])

    const chosePokemon = () => {
        navigate(`/pokemon/${fullPokemonInformation.name}`)
    }

    return (
        <div className="pokemonCard" onClick={()=> chosePokemon()} >
            <img src={fullPokemonInformation?.sprites?.back_default} alt="pokemon"/>
            <p>{pokemon.name}</p>
        </div>
    )
}