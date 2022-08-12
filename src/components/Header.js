import '../styles/header.scss'

export const Header = () => {
    return (
        <div className="header">
            <p className="header__logo">Pokemon Go</p>
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