import React, { useEffect, useState } from 'react'
import {PageArea} from './styled'

import { PageContainer, PageTitle, ErrorMessage } from '../../components/MainComponents'
import { useDispatch, useSelector } from 'react-redux';
import useApi from '../../helpers/OlxApi';
import { doLogin } from '../../helpers/AuthHandler';
import {   SET_EMAIL,
    SET_PASSWORD,
    SET_CONFIRM_PASSWORD,
    SET_NAME,
    SET_STATELOCK}from '../../actions/userActions';

export const SignUp = () => {11
    const api = useApi();
    const dispatch = useDispatch();
    const user_name = useSelector((state) => state.user.name);
    const userStateLock = useSelector((state) => state.user.userStateLock);
    const email = useSelector((state) => state.user.email);
    const password = useSelector((state) => state.user.password);
    const confirm_password = useSelector((state) => state.user.confirmPassword);

    const [disabled, setDisabled] = React.useState(false);
    const [error, setError] = React.useState('');
    const [statesList, setStatesList] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setDisabled(true);

        console.log("Tentativa de login com:", email, password);

        try {
            const json = await api.register(user_name,email, password,userStateLock  );
            if (json.error) {
                console.log('deu error',json);
                setError(json.error);
                setDisabled(false); // Reabilita o formulário se houver erro
            } else {
                console.log('deu certo',json);
                doLogin(json.token);
                window.location.href = '/';
            }
        } catch (error) {
            // Lidar com erros de rede ou outros erros
            console.error("Erro no login:", error);
            setError("Erro ao tentar fazer login.");
            setDisabled(false); // Reabilita o formulário se houver erro
        }

    }


    React.useEffect(() => {
        const getStates = async () => {
            try {
                const slist = await api.getStates();
                setStatesList(slist);
            } catch (error) {
                console.error("Falha ao carregar estados:", error);
                setStatesList([{name:'PB',_id:1}, {name:'SP', _id:2}]); // Valores padrão
            }
        };
        getStates();
    }, []);



  return (

    <PageContainer>
      <PageTitle>Cadastrar</PageTitle>
      <PageArea>
        {error && <ErrorMessage className="error">{error}</ErrorMessage>}
          <form onSubmit={handleSubmit}>
          <label className="area">
                  <div className="area--title">Nome Completo</div>
                  <div className="area--input">
                  <input type="text" required value={user_name} disabled={disabled} onChange={e => dispatch({ type: SET_NAME, payload: e.target.value })} />

                  </div>
              </label>
              <label className="area">
                  <div className="area--title">Estado</div>
                  <div className="area--input">
                  <select type="text" required value={userStateLock} disabled={disabled} onChange={e => dispatch({ type: SET_STATELOCK, payload: e.target.value })} >
                        <option value=""></option>
                        {statesList.map((i, k) =>
                                    <option key={k} value={i._id}>{i.name}</option>
                                )}
                    </select>
                  </div>
              </label>
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
                  <div className="area--title">Confirmar Senha</div>
                  <div className="area--input">
                  <input type="password"  required value={confirm_password} disabled={disabled} onChange={e => dispatch({ type: SET_CONFIRM_PASSWORD, payload: e.target.value })} />

                  </div>
              </label>
              <label className="area">
                  <div className="area--title"></div>
                  <div className="area--input">
                      <button>Cadastrar</button>
                  </div>
              </label>

            </form>
        </PageArea>
    </PageContainer>

    )

}
