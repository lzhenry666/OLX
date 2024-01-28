import {HeaderArea} from './styled'
import {Link} from 'react-router-dom'
import {isLogged, doLogout} from '../../../helpers/AuthHandler'

const Header = () => {
  let logged = isLogged()
  const HandledoLogout = () => {
    doLogout()
    window.location.href = '/'
  }
  return (
    <HeaderArea>

    <div className='container'>
      <div className='logo'>
        <a href='/'>
          <span className='logo-1'>O</span>
          <span className='logo-2'>L</span>
          <span className='logo-3'>X</span>
        </a>
      </div>
      <nav>
        <ul>
          {logged &&
            <>
              <li><Link to='/my-account'>Minha Conta</Link></li>
              <li><button onClick={HandledoLogout}>Sair</button></li>
              <li><Link to='/post-an-ad' className='button'>Poste um anúncio</Link></li>
            </>}
          {!logged &&
            <>
              <li><Link to='/signin'>Login</Link></li>
              <li><Link to='/signup'>Cadastrar</Link></li>
            </>}

        </ul>
      </nav>
    </div>

    </HeaderArea>
  )
}

export default Header
