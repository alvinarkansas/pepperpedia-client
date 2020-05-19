import axios from 'axios';

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

export const SET_PROMPT_IS_OPEN = (data) => {
    return { type: 'SET_PROMPT_IS_OPEN', payload: data }
}

export const SET_DEL_PROMPT_IS_OPEN = (data) => {
    return { type: 'SET_DEL_PROMPT_IS_OPEN', payload: data }
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

export const SET_NOTIF_OPEN = (data) => {
    return { type: 'SET_NOTIF_OPEN', payload: data }
}

export const SET_NOTIF_MESSAGE = (data) => {
    return { type: 'SET_NOTIF_MESSAGE', payload: data }
}

export const SET_AUTH_MESSAGE = (data) => {
    return { type: 'SET_AUTH_MESSAGE', payload: data }
}

export const SET_RECIPES_LOADING = (data) => {
    return { type: 'SET_RECIPES_LOADING', payload: data }
}

export const SET_AUTH_LOADING = (data) => {
    return { type: 'SET_AUTH_LOADING', payload: data }
}

export const SET_SEARCH_LOADING = (data) => {
    return { type: 'SET_SEARCH_LOADING', payload: data }
}

export const SET_ADD_LOADING = (data) => {
    return { type: 'SET_ADD_LOADING', payload: data }
}

export const SET_DELETE_LOADING = (data) => {
    return { type: 'SET_DELETE_LOADING', payload: data }
}

export const SET_EDIT_PROFILE_LOADING = (data) => {
    return { type: 'SET_EDIT_PROFILE_LOADING', payload: data }
}

export const SET_EDIT_RECIPE_LOADING = (data) => {
    return { type: 'SET_EDIT_RECIPE_LOADING', payload: data }
}

// const baseUrl = 'http://localhost:3000';
const baseUrl = 'https://secret-plains-42994.herokuapp.com';

export const FETCH_RECIPES = () => {
    return (dispatch) => {
        dispatch(SET_RECIPES_LOADING(true));
        axios({
            method: 'get',
            url: `${baseUrl}/recipes`
        })
            .then(({ data }) => {
                dispatch(SET_RECIPES(data));
                console.log('> > > > ', data);
            })
            .catch(err => {
                console.log(err);
            })
            .finally(_ => {
                dispatch(SET_RECIPES_LOADING(false));
            })
    }
}

export const ADD_RECIPE = (data) => {
    return (dispatch) => {
        dispatch(SET_ADD_LOADING(true));
        return axios({
            method: 'post',
            url: `${baseUrl}/recipes`,
            headers: {
                token: localStorage.getItem('token')
            },
            data
        })
    }
}

export const FETCH_RECIPE = (id) => {
    return (dispatch) => {
        dispatch(SET_RECIPES_LOADING(true));
        axios({
            method: 'get',
            url: `${baseUrl}/recipes/${id}`
        })
            .then(({ data }) => {
                dispatch(SET_RECIPE(data));
                console.log('> > > > ', data);
            })
            .catch(err => {
                console.log(err);
            })
            .finally(_ => {
                dispatch(SET_RECIPES_LOADING(false));
            })
    }
}

export const SEARCH_RECIPE = (term) => {
    return (dispatch) => {
        dispatch(SET_SEARCH_LOADING(true));
        axios({
            method: 'get',
            url: `${baseUrl}/recipes/search?term=${term}`
        })
            .then(({ data }) => {
                dispatch(SET_SEARCHED_RECIPES(data));
                console.log('> > > > ', data);
            })
            .catch(err => {
                dispatch(SET_SEARCH_ERROR(err.response.data))
                console.log(err.response.data);
            })
            .finally(_ => {
                dispatch(SET_SEARCH_LOADING(false));
            })
    }
}

export const FETCH_USER_RECIPE = (userId) => {
    return (dispatch) => {
        axios({
            method: 'get',
            url: `${baseUrl}/recipes/by/${userId}`
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
        dispatch(SET_AUTH_LOADING(true));
        axios.post(`${baseUrl}/users/signin`, data)
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
                dispatch(SET_AUTH_MESSAGE([err.response.data]));
                // err.response.data = Invalid Email/Password
            })
            .finally(_ => {
                dispatch(SET_AUTH_LOADING(false));
            })
    }
}

export const SIGN_UP = (data) => {
    return (dispatch) => {
        dispatch(SET_AUTH_LOADING(true));
        axios.post(`${baseUrl}/users/signup`, data)
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
                if (typeof err.response.data.message === 'object') {
                    dispatch(SET_AUTH_MESSAGE(err.response.data.message));
                } else {
                    dispatch(SET_AUTH_MESSAGE([err.response.data.message]));
                }

                // err.response.data.message = ['first name cant be empty, lastname cant be empty, invalid email format, password should at leas have 6 chars]
            })
            .finally(_ => {
                dispatch(SET_AUTH_LOADING(false));
            })
    }
}

export const FETCH_A_USER = (userId) => {
    return (dispatch) => {
        axios({
            method: 'get',
            url: `${baseUrl}/users/${userId}`
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
        dispatch(SET_EDIT_PROFILE_LOADING(true));
        return axios({
            method: 'put',
            url: `${baseUrl}/users`,
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
                dispatch(SET_NOTIF_OPEN(true));
                dispatch(SET_NOTIF_MESSAGE('Changes saved'));
            })
            .catch(err => {
                console.log(err);
            })
            .finally(_ => dispatch(SET_EDIT_PROFILE_LOADING(false)))
    }
}

export const DELETE_RECIPE = (recipeId, userId) => {
    return (dispatch) => {
        dispatch(SET_DELETE_LOADING(true));
        return axios({
            method: 'delete',
            url: `${baseUrl}/recipes/${recipeId}`,
            headers: {
                token: localStorage.getItem('token')
            }
        })
    }
}

export const EDIT_RECIPE = (data, recipeId) => {
    return (dispatch) => {
        dispatch(SET_EDIT_RECIPE_LOADING(true));
        return axios({
            method: 'put',
            url: `${baseUrl}/recipes/${recipeId}`,
            headers: {
                token: localStorage.getItem('token')
            },
            data,
        })
    }
}
