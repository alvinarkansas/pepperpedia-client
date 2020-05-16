import axios from 'axios';
// import store from './index';

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

export const SET_MODAL_SIGNUP_IS_OPEN = (data) => {
    return { type: 'SET_MODAL_SIGNUP_IS_OPEN', payload: data }
}

export const SET_MODAL_EDIT_IS_OPEN = (data) => {
    return { type: 'SET_MODAL_EDIT_IS_OPEN', payload: data }
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

export const SET_USER_RECIPES = (data) => {
    return { type: 'SET_USER_RECIPES', payload: data }
}

export const SET_A_USER = (data) => {
    return { type: 'SET_A_USER', payload: data }
}

export const EDIT_USER_DATA = (data) => {
    return { type: 'EDIT_USER_DATA', payload: data }
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

export const FETCH_USER_RECIPE = (userId) => {
    return (dispatch) => {
        axios({
            method: 'get',
            url: `http://localhost:3000/recipes/by/${userId}`
        })
            .then(({ data }) => {
                dispatch(SET_USER_RECIPES(data));
                console.log('> > > > ', data);
            })
            .catch(err => {
                console.log(err);
            })
    }
}

export const SIGN_IN = (data) => {
    return (dispatch) => {
        axios.post('http://localhost:3000/users/signin', data)
            .then(({ data }) => {
                const { token, first_name, last_name, profile_picture, id, email, bio, location } = data;
                console.log(data);
                dispatch(SET_IS_LOGGED_IN(true));
                dispatch(SET_USER_DATA({
                    token,
                    first_name,
                    last_name,
                    profile_picture,
                    id,
                    email,
                    bio,
                    location
                }))
                localStorage.setItem('token', data.token);
                localStorage.setItem('first_name', data.first_name);
                localStorage.setItem('last_name', data.last_name);
                localStorage.setItem('profile_picture', data.profile_picture);
                localStorage.setItem('id', data.id);
                localStorage.setItem('email', data.email);
                dispatch(SET_MODAL_IS_OPEN(false));
            })
            .catch(err => {
                console.log(err.response);
            })
    }
}

export const SIGN_UP = (data) => {
    return (dispatch) => {
        axios.post('http://localhost:3000/users/signup', data)
            .then(({ data }) => {
                const { token, first_name, last_name, profile_picture, id, email, bio, location } = data;
                console.log(data);
                dispatch(SET_IS_LOGGED_IN(true));
                dispatch(SET_USER_DATA({
                    token,
                    first_name,
                    last_name,
                    profile_picture,
                    id,
                    email,
                    bio,
                    location
                }))
                localStorage.setItem('token', data.token);
                localStorage.setItem('first_name', data.first_name);
                localStorage.setItem('last_name', data.last_name);
                localStorage.setItem('profile_picture', data.profile_picture);
                localStorage.setItem('id', data.id);
                localStorage.setItem('email', data.email);
                dispatch(SET_MODAL_SIGNUP_IS_OPEN(false));
            })
            .catch(err => {
                console.log(err.response);
            })
    }
}

export const FETCH_A_USER = (userId) => {
    return (dispatch) => {
        axios({
            method: 'get',
            url: `http://localhost:3000/users/${userId}`
        })
            .then(({ data }) => {
                dispatch(SET_A_USER(data));
                console.log('> > > > ', data);
            })
            .catch(err => {
                console.log(err);
            })
    }
}

export const EDIT_PROFILE = (data) => {
    return (dispatch) => {
        axios({
            method: 'put',
            url: 'http://localhost:3000/users',
            headers: {
                token: localStorage.getItem('token')
            },
            data,
        })
            .then(({ data }) => {
                dispatch(FETCH_A_USER(data.id));
                dispatch(EDIT_USER_DATA({
                    first_name: data.first_name,
                    last_name: data.last_name,
                    profile_picture: data.profile_picture,
                    bio: data.bio,
                    location: data.location
                }))
                console.log('[ Profile Updated ] > > > > ', data);
            })
            .catch(err => {
                console.log(err);
            })
    }
}
