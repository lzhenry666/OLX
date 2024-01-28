import React, {  useRef, useEffect} from 'react';
import MaskedInput from 'react-text-mask';
import createNumberMask from 'text-mask-addons/dist/createNumberMask';

import { PageArea} from './styled';
import useApi from '../../helpers/OlxApi';
import {useNavigate} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {PageContainer, PageTitle, ErrorMessage } from '../../components/MainComponents';
import { SET_DESC, SET_PRICE_NEGOTIABLE, SET_PRICE, SET_CATEGORY, SET_TITLE,  SET_CATEGORIES } from '../../actions/adActions';

export const AddAd = () => {11
    const api = useApi();
    const fileField = useRef();
    const navigate = useNavigate();

    const dispatch = useDispatch();
    //const user = useSelector((state) => state.user);
   // const email = useSelector((state) => state.user.email);

   const categories =  useSelector((state) => state.ad.categories);

   const title= useSelector((state) => state.ad).title;
   const category =  useSelector((state) => state.ad.category);
   const price=  useSelector((state) => state.ad.price);
   const priceNegotiable =useSelector((state) => state.ad.priceNegotiable);
   const desc = useSelector((state) => state.ad.desc);

    const [disabled, setDisabled] = React.useState(false);
    const [error, setError] = React.useState('');

    useEffect(() => {
        const getCategories = async () => {
            const cats = await api.getCategories();
            dispatch({ type: SET_CATEGORIES, payload: cats });
        };

        getCategories();
    }, [dispatch]);

    // Log outside of useEffect to observe changes
    useEffect(() => {
        console.log('Updated categories:', categories);
    }, [categories]);
    const handleSubmit = async (e) => {
        e.preventDefault();
        setDisabled(true);
        setError('');
        let errors = [];

        if(!title.trim()) {
            errors.push('Preencha o Título');
        }
        if(!category) {
            errors.push('Escolha a categoria');
        }

        if(errors.length === 0) {
             const fData = new FormData();
             fData.append('title',title);
             fData.append('price',price);
             fData.append('priceneg',priceNegotiable);
             fData.append('desc',desc);
             fData.append('cat',category);

             console.log(`🚀 ~ handleSubmit ~ fileField.current.files.length`, fileField.current.files.length);
             if(fileField.current.files.length >0) {
                 for(let i=0;i<fileField.current.files.length;i++) {
                    fData.append(`img`, fileField.current.files[i]);
                }
             }

             const json = await api.addAd(fData);
             console.log(`🚀 ~ handleSubmit ~ json:`, json);

             if(!json.error) {
                //history.push(`/ad/${json.id}`);
                navigate(`/ad/${json.id}`);
                return;
             } else {
                 setError(json.error);
             }
        } else {
            setError(errors.join("\n"));
        }
    }

    const priceMask = createNumberMask({
        prefix:'R$ ',
        includeThousandsSeparator:true,
        thousandsSeparatorSymbol:'.',
        allowDecimal:true,
        decimalSymbol:','
    })

    const handlePriceNegotiableChange = () => {
        dispatch({ type: SET_PRICE_NEGOTIABLE, payload: !priceNegotiable });
    };
  return (

    <PageContainer>
      <PageTitle>Postar um anuncio</PageTitle>
      <PageArea>
                    {error &&
                        <ErrorMessage>
                            {error}
                        </ErrorMessage>
                    }
                    <form onSubmit={handleSubmit}>
                        <label className="area">
                            <div className="area--title">
                                Titulo
                            </div>
                            <div className="area--input">
                                <input
                                    type="text"
                                     disabled={disabled}
                                     value={title}
                                     onChange={e => dispatch({ type: SET_TITLE, payload: e.target.value })}
                                     required
                                />
                            </div>
                        </label>
                        <label className="area">
                            <div className="area--title">
                                Categoria
                            </div>
                            <div className="area--input">
                                <select
                                    disabled={disabled}
                                    onChange={e => dispatch({ type: SET_CATEGORY, payload: e.target.value })}
                                    required
                                >
                                    <option></option>
                                    {categories && categories.map(i=>
                                         <option key={i._id} value={i._id}>{i.name}</option>
                                     )}
                                </select>

                            </div>
                        </label>
                        <label className="area">
                            <div className="area--title">
                                Price
                            </div>
                            <div className="area--input">
                                <MaskedInput
                                    mask={priceMask}
                                    placeholder="R$ "
                                    disabled={disabled || priceNegotiable}
                                    value={price}
                                    onChange={e => dispatch({ type: SET_PRICE, payload: e.target.value })}
                                />

                            </div>
                        </label>
                        <label className="area">
                            <div className="area--title">
                                Preço Negociável
                            </div>
                            <div className="area--input">
                                <input
                                    type="checkbox"
                                    disabled={disabled}
                                    checked={priceNegotiable}
                                    onChange={handlePriceNegotiableChange}

                                />
                            </div>
                        </label>
                        <label className="area">
                            <div className="area--title">
                                Descrição
                            </div>
                            <div className="area--input">
                                <textarea
                                     disabled={disabled}
                                     value={desc}
                                     onChange={e=>dispatch({ type: SET_DESC, payload: e.target.value })}
                                     ></textarea>
                            </div>
                        </label>
                        <label className="area">
                            <div className="area--title">
                                Imagens
                            </div>
                            <div className="area--input">
                                <input
                                    type="file"
                                     disabled={disabled}
                                     ref={fileField}
                                     multiple
                                />
                            </div>
                        </label>
                        <label className="area">
                            <div className="area--title">
                            </div>
                            <div className="area--input">
                               <button>
                                   Adicionar Anuncio
                               </button>
                            </div>
                        </label>
                    </form>
                </PageArea>
    </PageContainer>

    )

}
