import Cookies from 'js-cookie';
import qs from 'qs';
const BASEAPI = 'http://127.0.0.1:3001';


const  apiFetchPost = async (endpoint, body) => {

    if(!body.token) {
        let token = Cookies.get('token');
        if(token) {
            body.token = token;
        }
    }

    const res = await fetch(BASEAPI+endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json', 'Access-Control-Allow-Origin': '*' },
        body: JSON.stringify(body)
    });
    const json = await res.json();

    if(json.notallowed) {
        window.location.href = '/signin';
        return;
    }
    return json;
}

const  apiFetchGet = async (endpoint, body = []) => {

    if(!body.token) {
        let token = Cookies.get('token');
        if(token) {
            body.token = token;
        }
    }

    const res = await fetch(`${BASEAPI+endpoint}?${qs.stringify(body)}`);
    const json = await res.json();

    if(json.notallowed) {
        window.location.href = '/signin';
        return;
    }
    return json;
}

const apiFetchFile = async (endpoint, body) => {

        if(!body.token) {
            let token = Cookies.get('token');
            if(token) {
                body.append('token', token);
            }
        }

        const res = await fetch(BASEAPI+endpoint, {
            method: 'POST',
            body
        });
        const json = await res.json();

        if(json.notallowed) {
            window.location.href = '/signin';
            return;
        }
        return json;
    }

const apiFetchPut = async (endpoint, body) => {

        if(!body.token) {
            let token = Cookies.get('token');
            if(token) {
                body.token = token;
            }
        }

        const res = await fetch(BASEAPI+endpoint, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json', 'Accept': 'application/json', 'Access-Control-Allow-Origin': '*' },
            body: JSON.stringify(body)
        });
        const json = await res.json();

        if(json.notallowed) {
            window.location.href = '/signin';
            return;
        }
        return json;
    }

const OlxApi = {
    login: async (email, password) => {
        const json = await apiFetchPost(
            '/user/signin',
            {email, password}
        );

        return json;
    },
    register: async (name, email, password, userStateLock) => {
        const json = await apiFetchPost(
            '/user/signup',
            {name, email, password, state:userStateLock}
        );

        return json;
    },
    getStates: async () => {
        const json = await apiFetchGet(
            '/states'
        );

        return json.states;
    },
    getCategories: async () => {
        const json = await apiFetchGet(
            '/categories'
        );

        return json.categories;
    },
    getAds: async (options) => {
        const json = await apiFetchGet(
            '/ad/list',
            options
        );

        return json;
    },
    getAd: async (id, other = false) => {
        const json = await apiFetchGet(
            '/ad/'+id,
            {id,other}
        );

        return json;
    },
    addAd: async (fData) => {
        const json = await apiFetchFile(
            '/ad/add',
            fData
        );

        return json;
    },
    getUser: async () => {
        const json = await apiFetchGet('/user/me');
        return json;
      },

      updateUser: async (name, email, state, password) => {
        const json = await apiFetchPut('/user/me', {
          name,
          email,
          state,
          password
        });
        return json;
      },

       // Função para retornar a URL base da API
       baseUrl() {
        return BASEAPI;
    },

    // Função para construir a URL da imagem
    getImageUrl(imageName) {
        return `${this.baseUrl()}/assets/images/${imageName}`;
    }
};

export default () => OlxApi;