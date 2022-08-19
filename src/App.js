import './App.scss'
import { Header } from './components/Header'
import { PokemonsPage } from './pages/pokemons/PokemonsPage'
import {
  Route,
  Routes
} from 'react-router-dom'
import { ChosenPokemonPage } from './pages/pokemons/ChosenPokemonPage'
import { CreatePokemonPage } from './pages/pokemons/CreatePokemonPage'
import { ChooseAbilityPokemonPage } from './pages/pokemons/ChooseAbilityPokemonPage'
import { PokemosCreatedSuccess } from './pages/pokemons/PokemosCreatedSuccess'

const App = () => {
  return (
    <div className="App">
        <Header/>
        <Routes>
            <Route path="/" element={<PokemonsPage/>} />
        </Routes>
        <Routes>
            <Route path="/pokemon/:pokemonName" element={<ChosenPokemonPage/>} />
        </Routes>
        <Routes>
            <Route path="/create-pokemon" element={<CreatePokemonPage/>} />
        </Routes>
        <Routes>
            <Route path="/create-pokemon/choose-ability" element={<ChooseAbilityPokemonPage/>} />
        </Routes>
        <Routes>
            <Route path="/create-pokemon/choose-ability/success" element={<PokemosCreatedSuccess/>} />
        </Routes>

    </div>
  )
}

export default App
