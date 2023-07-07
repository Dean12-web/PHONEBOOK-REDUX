const initialState = {
    data: [],
    page: 1,
    prevPage:0,
    nextPage:2,
    isLoading: false,
    hasMore: true,
    sortBy:'name',
    sortMode:'desc',
}
export default function phonebooks(state = initialState, action) {
    switch (action.type) {
        case 'LOAD_PHONEBOOK_SUCCESS':
            return {
                ...state,
                data: [...action.phonebooks],
                page: state.page,
                nextPage : state.nextPage + 1,
                isLoading: false,
                hasMore: action.phonebooks.length > 0
            }

        case 'ADD_PHONEBOOOK_DRAW':
            return [{ ...action.phonebooks, sent: true }, ...state]
        case 'ADD_PHONEBOOK_SUCCESS':
            return state.map(item => {
                if (item.id === action.id) {
                    item.id = action.phonebooks.id
                }
                return item
            })
        case 'ADD_PHONEBOOK_FAILURE':
            return state.map(item => {
                if (item.id === action.id) {
                    item.sent = false
                }
                return item
            })
        case 'UPDATE_PHONEBOOK_SUCCESS':
            return state.map(item => {
                if (item.id === action.id) {
                    item.name = action.phonebooks.name
                    item.phone = action.phonebooks.phone
                }
                return item
            })
        case 'REMOVE_PHONEBOOK_FAILURE':
            return state.filter(item => item.id !== action.id)
        case 'REMOVE_PHONEBOOK_FAILURE':
        case 'LOAD_PHONEBOOK_FAILURE':
        default:
            return state
    }
}