import React from 'react'
import {PageArea} from './styled'

import { PageContainer, PageTitle, ErrorMessage } from '../../components/MainComponents'
import { useDispatch, useSelector } from 'react-redux';
import useApi from '../../helpers/OlxApi';
import { doLogin } from '../../helpers/AuthHandler';
import {   SET_EMAIL,
    SET_PASSWORD,
    SET_REMEMBER_PASSWORD,
   }from '../../actions/userActions';

export const SignIn = () => {11
    const api = useApi();
    const dispatch = useDispatch();
    //const user = useSelector((state) => state.user);
    const email = useSelector((state) => state.user.email);
    const password = useSelector((state) => state.user.password);
    const rememberPassword = useSelector((state) => state.user.rememberPassword);

    const [disabled, setDisabled] = React.useState(false);
    const [error, setError] = React.useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setDisabled(true);

        console.log("Tentativa de login com:", email, password);

        try {
            const json = await api.login(email, password);
            if (json.error) {
                console.log('deu error',json);
                setError(json.error);
                setDisabled(false); // Reabilita o formulário se houver erro
            } else {
                console.log('deu certo',json);
                doLogin(json.token, rememberPassword);
                window.location.href = '/';
            }
        } catch (error) {
            // Lidar com erros de rede ou outros erros
            console.error("Erro no login:", error);
            setError("Erro ao tentar fazer login.");
            setDisabled(false); // Reabilita o formulário se houver erro
        }

    }


  ;


  return (

    <PageContainer>
      <PageTitle>Login</PageTitle>
      <PageArea>
        {error && <ErrorMessage className="error">{error}</ErrorMessage>}
          <form onSubmit={handleSubmit}>
              <label className="area">
                  <div className="area--title">E-mail</div>
                  <div className="area--input">
                  <input type="email" required value={email} disabled={disabled} onChange={e => dispatch({ type: SET_EMAIL, payload: e.target.value })} />

                  </div>
              </label>
              <label className="area">
                  <div className="area--title">Senha</div>
                  <div className="area--input">
                  <input type="password"  required value={password} disabled={disabled} onChange={e => dispatch({ type: SET_PASSWORD, payload: e.target.value })} />

                  </div>
              </label>
              <label className="area">
                  <div className="area--title">Lembrar Senha</div>
                  <div className="area--input">
                  <input type="checkbox" checked={rememberPassword} disabled={disabled} onChange={e => dispatch({ type: SET_REMEMBER_PASSWORD, payload: e.target.checked })} />

                  </div>
              </label>
              <label className="area">
                  <div className="area--title"></div>
                  <div className="area--input">
                      <button>Fazer Login</button>
                  </div>
              </label>

            </form>
        </PageArea>
    </PageContainer>

    )

}
