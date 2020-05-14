import axios from 'axios';
import store from './index';

export const SET_RECIPES = (data) => {
    return { type: 'SET_RECIPES', payload: data }
}

export const SET_IS_LOGGED_IN = (data) => {
    return { type: 'SET_IS_LOGGED_IN', payload: data }
}

export const SET_USER_DATA = (data) => {
    return { type: 'SET_USER_DATA', payload: data }
}

export const SET_MODAL_IS_OPEN = (data) => {
    return { type: 'SET_MODAL_IS_OPEN', payload: data }
}

export const SET_RECIPE = (data) => {
    return { type: 'SET_RECIPE', payload: data }
}

export const SET_SEARCHED_RECIPES = (data) => {
    return { type: 'SET_SEARCHED_RECIPES', payload: data }
}

export const SET_SEARCH_ERROR = (data) => {
    return { type: 'SET_SEARCH_ERROR', payload: data }
}

export const FETCH_RECIPES = () => {
    return (dispatch) => {
        axios({
            method: 'get',
            url: 'http://localhost:3000/recipes'
        })
            .then(({ data }) => {
                dispatch(SET_RECIPES(data));
                console.log('> > > > ', data);
            })
            .catch(err => {
                console.log(err);
            })
    }
}

export const ADD_RECIPE = (data) => {
    return (dispatch) => {
        axios({
            method: 'post',
            url: 'http://localhost:3000/recipes',
            headers: {
                token: localStorage.getItem('token')
            },
            data
        })
            .then(({ data }) => {
                console.log('successfully wrote new recipe > > > ', data);
                dispatch(FETCH_RECIPES())
            })
            .catch(err => {
                console.log(err.response);
            })
    }
}

export const FETCH_RECIPE = (id) => {
    return (dispatch) => {
        axios({
            method: 'get',
            url: `http://localhost:3000/recipes/${id}`
        })
            .then(({ data }) => {
                dispatch(SET_RECIPE(data));
                console.log('> > > > ', data);
            })
            .catch(err => {
                console.log(err);
            })
    }
}

export const SEARCH_RECIPE = (term) => {
    return (dispatch) => {
        axios({
            method: 'get',
            url: `http://localhost:3000/recipes/search?term=${term}`
        })
            .then(({ data }) => {
                dispatch(SET_SEARCHED_RECIPES(data));
                console.log('> > > > ', data);
            })
            .catch(err => {
                dispatch(SET_SEARCH_ERROR(err.response.data))
                console.log(err.response.data);
            })
    }
}