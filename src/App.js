import './App.scss'
import { Header } from './components/Header'
import { PokemonsPage } from './pages/pokemons/PokemonsPage'
import {
  Route,
  Routes
} from 'react-router-dom'
import { ChosenPokemonPage } from './pages/pokemons/ChosenPokemonPage'

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
    </div>
  )
}

export default App
