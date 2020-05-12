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