import React from 'react'
import {PageArea, Fake, OthersArea, BreadChumb} from './styled'
import {useParams, Link} from 'react-router-dom';
import { PageContainer } from '../../components/MainComponents'
import useApi from '../../helpers/OlxApi';
import { Slide } from 'react-slideshow-image';
import "react-slideshow-image/dist/styles.css";
import AdItem from '../../components/partials/AdItem';
import Pagination from '../../components/partials/Pagination/Index';

export const AdPage = () => {11
    const api = useApi();
    const {id} = useParams();
    const [loading, setLoading] = React.useState(true);
    const [adInfo, setAdInfo] = React.useState([]);
    const [OthersAds, setOthersAds] = React.useState([]);

    React.useEffect(() => {
        const getAdInfo = async (id) => {
            const json = await api.getAd(id, true);
            console.log(`🚀 ~ getAdInfo ~ json:`, json);
            setAdInfo(json);
            setLoading(false);
            setOthersAds(json.others);

        }
        getAdInfo(id);
    }, []);

    const [currentPage, setCurrentPage] = React.useState(1);
    const [adsPerPage] = React.useState(10); // Defina o limite de anúncios por página
    const totalAds = OthersAds.length; // Pega o total de anúncios

    // Função para calcular o índice dos anúncios para a página atual
    const indexOfLastAd = currentPage * adsPerPage;
    const indexOfFirstAd = indexOfLastAd - adsPerPage;
    const currentAds = OthersAds.slice(indexOfFirstAd, indexOfLastAd);

    // Função para mudar a página
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    // Crie um componente para renderizar os números da página



    const formatDate = (date) => {
        let cDate = new Date(date);
        let months = ['janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho',
         'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'];
        let cDay = cDate.getDate();
        let cMonth = cDate.getMonth();
        let cYear = cDate.getFullYear();

        return `${cDay} de ${months[cMonth]} de ${cYear}`;
    }

  return (

    <PageContainer>
           {adInfo.category &&
                <BreadChumb>
                    Você está aqui:
                    <Link to="/">Home</Link>
                    /
                    <Link to={`/ads?state=${adInfo.stateName}`}>{adInfo.stateName}</Link>
                    /
                    <Link to={`/ads?state=${adInfo.stateName}&cat=${adInfo.category.slug}`}>{adInfo.category.name}</Link>
                    / {adInfo.title}
                </BreadChumb>
            }
     <PageArea>
                <div className="leftSide">
                    <div className="box">
                        <div className="adImage">
                            {loading &&<Fake height={300} />}
                            {adInfo.images &&
                                <Slide>
                                    {adInfo.images.map((img, key) =>
                                        <div key={key} className="each-slide">
                                            <img src={img} alt="" />
                                        </div>
                                    )}
                                </Slide>
                            }
                        </div>
                        <div className="adInfo">
                            <div className="adName">
                                {loading &&<Fake height={20} />}
                                {adInfo.title &&
                                    <h2>{adInfo.title}</h2>
                                }
                                {adInfo.dateCreated &&
                                    <small>Criado em {formatDate(adInfo.dateCreated)}</small>
                                }
                            </div>
                            <div className="adDescription">
                                {loading &&<Fake height={100} />}
                                {adInfo.description}
                                <hr />
                                {adInfo.views &&
                                    <small>Visualizações: {adInfo.views} </small>
                                }
                            </div>
                        </div>
                    </div>
                </div>
                <div className="rightSide">
                    <div className ="box box--padding">
                        {loading &&<Fake height={20} />}
                        {adInfo.priceNegotiable &&
                            "Preço Negociável"
                        }
                        {!adInfo.priceNegotiable && adInfo.price &&
                            <div className="price">Preço: <span>R$ {adInfo.price}</span></div>
                        }
                    </div>
                    {loading &&<Fake height={50} />}
                    {adInfo.userInfo &&
                        <>
                            <a href={`mailto:${adInfo.userInfo.email}`} target="_blank" rel="noreferrer" className="contactSellerLink">Fale com o Vendedor</a>
                            <div className="createdBy box box--padding">
                                Criado por:
                                <strong>{adInfo.userInfo.name}</strong>
                                <small>Email: {adInfo.userInfo.email}</small>
                                <small>Estado: {adInfo.stateName}</small>
                            </div>
                        </>
                    }
                </div>



            </PageArea>
            <OthersArea>
                {adInfo.others &&
                    <>
                        <h2>Outras Ofertas do Vendedor</h2>
                        <div className="list">
                            {currentAds.map((i,key)=>
                                <AdItem key={key} data={i} />
                            )}
                        </div>
                        <Pagination
              adsPerPage={adsPerPage}
              totalAds={totalAds}
              paginate={paginate}
              currentPage={currentPage}
            />
                    </>
                }
            </OthersArea>
    </PageContainer>

    )

}
