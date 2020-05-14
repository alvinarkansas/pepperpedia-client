const initialState = {
    recipes: [],
    isLoggedIn: false,
    userData: {},
    modalIsOpen: false,
    recipe: {},
    searchedRecipes: [],
    searchError: '',
    userRecipes: [],
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
    if (action.type === 'SET_MODAL_IS_OPEN') {
        return { ...state, modalIsOpen: action.payload }
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
    return state
} 