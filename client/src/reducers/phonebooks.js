export default function phonebooks(state = {
    data: [],
    page: 1,
    totalPages: 1,
    totalItem: 0,
    isLoading: false,
    error: null
}, action) {
    switch (action.type) {
        case "FETCH_PHONEBOOKS_REQUEST":
            return { ...state, isLoading: true, error: null };
        case "FETCH_PHONEBOOKS_SUCCESS":
            return {
                ...state,
                data: action.phonebooks,
                page: action.page,
                totalPages: action.totalPages,
                totalItems: action.totalItems,
                isLoading: false,
                error: null,
            };
        case 'ADD_PHONEBOOOKS_DRAW':
            return [{ ...action.phonebooks, sent: true }, ...state]
        case 'ADD_PHONEBOOKS_SUCCESS':
            return state.map(item => {
                if (item.id === action.id) {
                    item.id = action.phonebooks.id
                }
                return item
            })
        case 'ADD_PHONEBOOKS_FAILURE':
            return state.map(item => {
                if (item.id === action.id) {
                    item.sent = false
                }
                return item
            })
        case 'UPDATE_PHONEBOOKS_SUCCESS':
            return state.map(item => {
                if (item.id === action.id) {
                    item.name = action.phonebooks.name
                    item.phone = action.phonebooks.phone
                }
                return item
            })
        case 'REMOVE_PHONEBOOKS_FAILURE':
            return state.filter(item => item.id !== action.id)
        case 'REMOVE_PHONEBOOK_FAILURE':
        case 'LOAD_PHONEBOOK_FAILURE':
        default:
            return state
    }
}