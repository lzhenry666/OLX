import  { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { PageArea,} from './styled';
import Modal from 'react-modal';

import { PageContainer, PageTitle} from '../../components/MainComponents';
import useApi from '../../helpers/OlxApi';
import MyAdItem from '../../components/partials/MyAdItem';
import Pagination from '../../components/partials/Pagination/Index';
const MyAccount = () => {

    const api = useApi();



    const [userData, setUserData] = useState({});

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [state, setState] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [ads, setAds] = useState([]);
    const [wrongPassword, setWrongPassword] = useState(false)

    const [disabled, setDisabled] = useState(false);



    useEffect(() => {
      const getUser = async () => {
        let getUserFromApi = await api.getUser();
        console.log(`🚀 ~ getUser ~ getUserFromApi:`, getUserFromApi);
        setUserData(getUserFromApi);
        setName(getUserFromApi.name);
        setEmail(getUserFromApi.email);
        setState(getUserFromApi.state);
        setAds(getUserFromApi.ads);
      };
      getUser();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    console.log(userData);

    const handleUpdateData = (e) => {
      setDisabled(true)
      e.preventDefault();
      if(password === passwordConfirm) {
        api.updateUser({
          name, email, state, password
        })
      } else {
        setWrongPassword(true)
      }
      setDisabled(false)
    }
    const paginate = (pageNumber) => setCurrentPage(pageNumber);
    const [currentPage, setCurrentPage] = useState(1);
    const [adsPerPage] =useState(10); // D
    const totalAds = ads.length; // Pega o total de anúncios

    const indexOfLastAd = currentPage * adsPerPage;
    const indexOfFirstAd = indexOfLastAd - adsPerPage;
    const currentAds = ads.slice(indexOfFirstAd, indexOfLastAd);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const openModal = () => {
      setModalIsOpen(true);
  };
  Modal.setAppElement('#root');


    return (
        <>
          <PageContainer>
        <PageTitle>Minha Conta</PageTitle>
        <PageArea>
          <div className="inputGroup">
            <form>
              <label className="area" htmlFor="name">
                Nome
              </label>
              <input
                type="text"
                id="name"
                disabled={disabled}
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />

              <label className="area" htmlFor="email">
                E-mail
              </label>
              <input
                type="email"
                id="email"
                disabled={disabled}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

              <label className="area" htmlFor="state">
                Estado
              </label>
              <input
                type="text"
                id="state"
                disabled={disabled}
                value={state}
                onChange={(e) => setState(e.target.value)}
                required
              />

              <label className="area" htmlFor="newPassword">
                Nova Senha
              </label>
              <input
                type="password"
                id="newPassword"
                disabled={disabled}
                value={password}
                placeholder="Digite sua nova senha"
                onChange={(e) => setPassword(e.target.value)}
                required
              />

              <label className="area" htmlFor="passwordConfirm">
                Confirmar Senha
              </label>
              <input
                type="password"
                id="passwordConfirm"
                disabled={disabled}
                placeholder="Confirme sua nova senha"
                value={passwordConfirm}
                onChange={(e) => setPasswordConfirm(e.target.value)}
                required
              />
              {wrongPassword &&
                <p className='wrongPassword'>Senhas não batem</p>
              }
              <button  className="button"onClick={handleUpdateData}>Atualizar Dados</button>
            </form>
          </div>

        </PageArea>
      </PageContainer>
            <PageContainer>
                <PageArea>
                    <h2>Meus Anúncios</h2>
                    <div className="list">
                        {currentAds.map((i,key)=>
                            <MyAdItem key={key} data={i} />
                        )}
                    </div>
                    <Pagination
              adsPerPage={adsPerPage}
              totalAds={totalAds}
              paginate={paginate}
              currentPage={currentPage}
            />
<Link to="#" className="seeAllLink" onClick={openModal}>Ver todos</Link>
<Modal isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)}>
<PageContainer>
                <PageArea>
    <h2>Todos os Meus Anúncios</h2>
    <button onClick={() => setModalIsOpen(false)}>Fechar</button>
    <div className="list">
        {ads.map((ad, key) => (
            <MyAdItem key={key} data={ad} />
        ))}
    </div>
</PageArea>
</PageContainer>
</Modal>

                    <hr />

                </PageArea>
            </PageContainer>
        </>
    )
}

export default MyAccount;