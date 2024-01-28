import React from 'react'
import {PageArea, SearchArea} from './styled'
import { Link } from 'react-router-dom';
import { PageContainer,   } from '../../components/MainComponents'
import useApi from '../../helpers/OlxApi';
import AdItem from '../../components/partials/AdItem/Index';

const Home = () => {
    const api = useApi();

    const [stateList, setStateList] = React.useState([]);
    const [categories, setCategories] = React.useState([]);
    const [adList, setAdList] = React.useState([]);

    React.useEffect(() => {
        const getStates = async () => {
            try {
                const slist = await api.getStates();
                setStateList(slist);
            } catch (error) {
                console.error("Falha ao carregar estados:", error);
                setStateList([{name:'PB'}, {name:'SP'}]); // Valores padrão
            }
        };
        getStates();
    }, []);


    React.useEffect(() => {
        const getCategories = async () => {
            const cats = await api.getCategories() ;
            setCategories(cats);
        };
        getCategories();
    }
    , []);


    React.useEffect(() => {
        const getRecentAds = async () => {
            const json = await api.getAds({
                sort:'desc',
                limit:8
            });
            setAdList(json.ads);
        };
        getRecentAds();
    }
    , []);


  return (
        <>
      <SearchArea>
                <PageContainer>
                    <div className="searchBox">
                        <form method="GET" action="/ads">
                            <input type="text" name="q" placeholder="O que você procura?" />
                            <select name="state">
                                {stateList.map((i,k)=>
                                    <option key={k} value={i.name}>{i.name}</option>
                                )}
                            </select>
                            <button>  <svg viewBox="0 0 24 24" height="24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M9.145 18.29c-5.042 0-9.145-4.102-9.145-9.145s4.103-9.145 9.145-9.145 9.145 4.103 9.145 9.145-4.102 9.145-9.145 9.145zm0-15.167c-3.321 0-6.022 2.702-6.022 6.022s2.702 6.022 6.022 6.022 6.023-2.702 6.023-6.022-2.702-6.022-6.023-6.022zm9.263 12.443c-.817 1.176-1.852 2.188-3.046 2.981l5.452 5.453 3.014-3.013-5.42-5.421z"></path></svg></button>
                        </form>
                    </div>
                    <div className="categoryList">
                        {categories.map((i,k)=>
                            <Link key={k} to={`/ads?cat=${i.slug}`} className="categoryItem">
                                <img src={i.img} alt="" />
                                <span>{i.name}</span>
                            </Link>
                        )}
                    </div>
                </PageContainer>
            </SearchArea>

    <PageContainer>
      <PageArea>
        <h2>Anúncios Recentes</h2>
        <div className="list">
            {adList.map((i,k)=>
                <AdItem key={k} data={i}/>
            )}
        </div>
        <Link to="/ads" className="seeAllLink">Ver todos</Link>
                <hr/>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisl eget ultricies aliquam, nunc nisl aliquet nunc, eget ultricies nisl
        </PageArea>
    </PageContainer>
    </>

    )

}
export default Home;
