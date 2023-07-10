const initialState = {
    page: 1,
    totalPage: 0,
    searchQuery: "",
    sortBy: 'name',
    sortMode: 'desc',
}
export default function phonebooks(state = initialState, action) {
    switch (action.type) {
        case 'UPDATE_PARAMS':
            return {
                ...state,
                ...action.params
            }
        case 'LOAD_PHONEBOOK_SUCCESS':
            console.log(state)
            return {
                ...state,
                totalPage: action.pages
            };
        default:
            return state
    }
}