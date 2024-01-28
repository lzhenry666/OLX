import {   SET_EMAIL,
    SET_PASSWORD,
    SET_REMEMBER_PASSWORD,
    SET_NAME,
    USER_LOGOUT,SET_STATELOCK,
    SET_CONFIRM_PASSWORD,
} from '../actions/userActions';

const initialState = {
    name: '',
    userStateLock: '',
    user: '',
    isLoggedIn: false,
    email: '',
    password: '',
    rembemberPassword: false,
    confirmPassword: '',
};

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_STATELOCK:
            return {
                ...state,
                userStateLock:action.payload
            };
        case SET_NAME:
            return {
                ...state,
                ...action.payload
            };
        case SET_PASSWORD:
            return {
                ...state,
                password:action.payload
            };
            case SET_CONFIRM_PASSWORD:
                return {
                    ...state,
                    confirmPassword:action.payload
                };
        case SET_EMAIL:
            return {
                ...state,
                email:action.payload
            };
        case SET_REMEMBER_PASSWORD:
            return {
                ...state,
                rembemberPassword:action.payload
            };
        case USER_LOGOUT:
            return initialState;  // Retorna para o estado inicial
        default:
            return state;
    }
};

export default userReducer;
