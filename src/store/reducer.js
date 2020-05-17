const initialState = {
    recipes: [],
    isLoggedIn: false,
    userData: {},
    modalIsOpen: false,
    modalSignUpIsOpen: false,
    modalEditIsOpen: false,
    recipe: {},
    searchedRecipes: [],
    searchError: '',
    userRecipes: [],
    aUser: {},
    notifOpen: false,
    notifMessage: '',
    authMessage: [],
}

export default function reducer(state = initialState, action) {
    if (action.type === 'SET_RECIPES') {
        return { ...state, recipes: action.payload }
    }
    if (action.type === 'SET_IS_LOGGED_IN') {
        return { ...state, isLoggedIn: action.payload }
    }
    if (action.type === 'SET_USER_DATA') {
        return { ...state, userData: action.payload }
    }
    if (action.type === 'EDIT_USER_DATA') {
        return {
            ...state,
            userData: {
                ...state.userData,
                firstName: action.payload.firstName,
                lastName: action.payload.lastName,
                bio: action.payload.bio,
                location: action.payload.location,
                profile_picture: action.payload.profile_picture
            }
        }
    }
    if (action.type === 'SET_MODAL_IS_OPEN') {
        return { ...state, modalIsOpen: action.payload }
    }
    if (action.type === 'SET_MODAL_SIGNUP_IS_OPEN') {
        return { ...state, modalSignUpIsOpen: action.payload }
    }
    if (action.type === 'SET_MODAL_EDIT_IS_OPEN') {
        return { ...state, modalEditIsOpen: action.payload }
    }
    if (action.type === 'SET_RECIPE') {
        return { ...state, recipe: action.payload }
    }
    if (action.type === 'SET_SEARCHED_RECIPES') {
        return { ...state, searchedRecipes: action.payload }
    }
    if (action.type === 'SET_SEARCH_ERROR') {
        return { ...state, searchError: action.payload }
    }
    if (action.type === 'SET_USER_RECIPES') {
        return { ...state, userRecipes: action.payload }
    }
    if (action.type === 'SET_A_USER') {
        return { ...state, aUser: action.payload }
    }
    if (action.type === 'SET_NOTIF_OPEN') {
        return { ...state, notifOpen: action.payload }
    }
    if (action.type === 'SET_NOTIF_MESSAGE') {
        return { ...state, notifMessage: action.payload }
    }
    if (action.type === 'SET_AUTH_MESSAGE') {
        return { ...state, authMessage: action.payload }
    }
    return state
} 