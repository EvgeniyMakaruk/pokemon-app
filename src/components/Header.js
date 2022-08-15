import '../styles/header.scss'
import { useNavigate } from 'react-router-dom'

export const Header = () => {
  const navigate = useNavigate()
  return (
        <div className="header">
            <p className="header__logo" onClick={() => navigate('/')}>Pokemon Go</p>
            <nav className='header__navbar'>
                <ul>
                    <li>Покемоны</li>
                    <li>Создать покемона</li>
                    <li>Настройки</li>
                </ul>
            </nav>
        </div>
  )
}
