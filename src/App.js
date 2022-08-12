import './App.scss'
import {fetchPokemons} from "./api/pokemonApi";
import {Header} from "./components/Header";
import {PokemonsPage} from "./pages/pokemons/PokemonsPage";

const App = () => {
  return (
    <div className="App">
        <Header/>
        <PokemonsPage/>
    </div>
  );
}

export default App;
