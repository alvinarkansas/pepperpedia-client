const initialState = {
    recipes: [],
    isLoggedIn: false,
    userData: {},
    modalIsOpen: false,
    modalSignUpIsOpen: false,
    modalEditIsOpen: false,
    promptIsOpen: false,
    delPromptIsOpen: false,
    recipe: {},
    searchedRecipes: [],
    searchError: '',
    userRecipes: [],
    aUser: {},
    notifOpen: false,
    notifMessage: '',
    authMessage: [],
    recipesLoading: false,
    authLoading: false,
    searchLoading: false,
    addLoading: false,
    deleteLoading: false,
    editProfileLoading: false,
    editRecipeLoading: false,
    removeLoading: false,
    cookmarks: [],
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
    if (action.type === 'SET_PROMPT_IS_OPEN') {
        return { ...state, promptIsOpen: action.payload }
    }
    if (action.type === 'SET_DEL_PROMPT_IS_OPEN') {
        return { ...state, delPromptIsOpen: action.payload }
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
    if (action.type === 'SET_RECIPES_LOADING') {
        return { ...state, recipesLoading: action.payload }
    }
    if (action.type === 'SET_AUTH_LOADING') {
        return { ...state, authLoading: action.payload }
    }
    if (action.type === 'SET_SEARCH_LOADING') {
        return { ...state, searchLoading: action.payload }
    }
    if (action.type === 'SET_ADD_LOADING') {
        return { ...state, addLoading: action.payload }
    }
    if (action.type === 'SET_DELETE_LOADING') {
        return { ...state, deleteLoading: action.payload }
    }
    if (action.type === 'SET_EDIT_PROFILE_LOADING') {
        return { ...state, editProfileLoading: action.payload }
    }
    if (action.type === 'SET_EDIT_RECIPE_LOADING') {
        return { ...state, editRecipeLoading: action.payload }
    }
    if (action.type === 'SET_REMOVE_LOADING') {
        return { ...state, removeLoading: action.payload }
    }
    if (action.type === 'SET_COOKMARKS') {
        return { ...state, cookmarks: action.payload }
    }
    return state
} 