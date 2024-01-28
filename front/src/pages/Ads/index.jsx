import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import { PageArea } from './styled';
import useApi from '../../helpers/OlxAPI';

import { PageContainer } from '../../components/MainComponents';
import AdItem from '../../components/partials/AdItem';
import Pagination from '../../components/partials/Pagination/Index';

let timer;

const Ads = () => {

    const api = useApi();
    const navigate = useNavigate();


    const useQueryString = () => {
        return new URLSearchParams (useLocation().search );
    }
    const query = useQueryString();

    const [q, setQ] = useState(query.get('q') != null ? query.get('q') : '' );
    const [cat, setCat] = useState(query.get('cat') != null ? query.get('cat') : '' );
    const [state, setState] = useState(query.get('state') != null ? query.get('state') : '' );

    const [adsTotal, setAdsTotal] = useState(0);
    const [statelist, setStateList] = useState([]);
    const [categories, setCategories] = useState([]);
    const [adList, setAdList] = useState([]);
    const [pageCount, setPageCount] = useState(0);

    const [resultOpacity, setResultOpacity] = useState(1);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);


    const getAdsList = async () => {
        setLoading(true);
        let offset = (currentPage-1) * 9;

        const json = await api.getAds({
            sort: 'desc',
            limit: 9,
            q,
            cat,
            state,
            offset
        });
        setAdList(json.ads);
        setAdsTotal(json.total);
        setResultOpacity(1);
        setLoading(false);
    }

    useEffect(() => {
        if(adList.length > 2) {
        setPageCount( Math.ceil(adsTotal / adList.length));
        } else {
            setPageCount (0);
        }
    }, [adsTotal]);

    useEffect(()=>{
        setResultOpacity(0.3);
        getAdsList();
    }, [currentPage]);

    useEffect(() => {
        let queryString = [];
        if(q) {
            queryString.push(`q=${q}`);
        }
        if(cat) {
            queryString.push(`cat=${cat}`);
        }
        if(state) {
            queryString.push(`state=${state}`);
        }


        navigate({
            search:`?${queryString.join('&')}`
        });
        if(timer){
            clearTimeout(timer);
        }
        timer= setTimeout(getAdsList, 2000);
        setResultOpacity(0.3);
        setCurrentPage(1);
    }, [q, cat, state]);

    useEffect(() => {
        const getState = async () => {
            const slist = await api.getStates();
            setStateList(slist);
        }
        getState();
    }, []);

    useEffect(() => {
        const getCategories = async () => {
            const cats = await api.getCategories();
            setCategories(cats);
        }
        getCategories();
    }, []);

    useEffect(() => {
        const getRecentAds = async () => {
            const json = await api.getAds({
                sort: 'desc',
                limit: 8
            });
            setAdList(json.ads);
        }
        getRecentAds();
    }, []);

/*     let pagination = [];
    for(let i=1;i<=pageCount;i++) {
        pagination.push(i);
    }
 */
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <PageContainer>
            <PageArea>
                <div className="leftSide">
                    <form method="GET">
                        <input
                            type="text"
                            name="q"
                            value={q}
                            placeholder="Pesquisar"
                            onChange={e=>setQ(e.target.value)}
                        />

                        <div className="filterName">Estado:</div>
                        <select name="state" value={state} onChange={e=>setState(e.target.value)}>
                            <option></option>
                            {statelist.map((i,key)=>
                                <option key={key} value={i.name} >{i.name}</option>
                            )}
                        </select>

                        <div className="filterName">Categoria:</div>
                        <ul>
                            {categories.map((i,key)=>
                                <li
                                    key={key}
                                    className={cat==i.slug?'categoryItem active':'categoryItem'}
                                    onClick={()=>setCat(i.slug)}
                                >
                                    <img src={i.img} alt=""/>
                                    <span>{i.name}</span>
                                </li>
                            )}
                        </ul>
                    </form>
                </div>
                <div className="rightSide">
                    <h2>Resultados</h2>
                    {loading && adList.length === 0  &&
                        <div className="listWarning">Carregando...</div>
                    }
                    {!loading && adList.length === 0 &&
                        <div className="listWarning">Não encontrado resultados.</div>
                    }

                    <div className="list" style={{opacity:resultOpacity}} >
                        {adList.map((i, key)=>
                            <AdItem key={key} data={i} />
                        )}
                    </div>
                {/* {      {pagination.map((i,key)=>
                       <div                            onClick={()=>setCurrentPage(i)}
                            className={i===currentPage?'pagItem active':'pagItem'}>
                            {i}                        </div>                        )}}  */}

<Pagination
                        adsPerPage={9} // Você estava usando 9 como seu limit na função getAdsList
                        totalAds={adsTotal}
                        paginate={paginate}
                        currentPage={currentPage}
                    />

     </div>

            </PageArea>
        </PageContainer>
    );
}

export default Ads;