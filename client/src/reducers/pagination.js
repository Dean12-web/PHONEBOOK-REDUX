const initialState = {
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
        case 'UPDATE_PARAMS':
            return {
                ...state,
                ...action.params
            }
        default:
            return state
    }
}