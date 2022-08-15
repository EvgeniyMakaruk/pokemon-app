import '../pokemonStyles.scss'

export const PokemonCard = ({ pokemon, onClickHandler, fullPokemonInformation }) => {
  return (
        <div className="pokemonCard" onClick={() => onClickHandler()} >
            <img src={fullPokemonInformation?.sprites?.back_default} alt="pokemon"/>
            <p>{pokemon.name}</p>
        </div>
  )
}
