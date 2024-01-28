// Defina as ações aqui
import { SET_DESC, SET_PRICE_NEGOTIABLE, SET_PRICE, SET_CATEGORY, SET_TITLE, RESET_AD,SET_CATEGORIES } from '../actions/adActions';

const initialState = {
    desc: '',
    priceNegotiable: false,  // Supondo que seja um booleano
    price: '',
    category: '',            // Supondo que seja uma string ou ID de categoria
    title: '',
    categories: []
};

const adReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_DESC:
            return {
                ...state,
                desc: action.payload
            };
        case SET_PRICE_NEGOTIABLE:
            return {
                ...state,
                priceNegotiable: action.payload
            };
        case SET_PRICE:
            return {
                ...state,
                price: action.payload
            };
        case SET_CATEGORY:
            return {
                ...state,
                category: action.payload
            };
            case SET_CATEGORIES:
                return {
                    ...state,
                    categories: action.payload
                };
        case SET_TITLE:
            return {
                ...state,
                title: action.payload
            };
        case RESET_AD:
            return initialState;  // Retorna para o estado inicial
        default:
            return state;
    }
};

export default adReducer;
