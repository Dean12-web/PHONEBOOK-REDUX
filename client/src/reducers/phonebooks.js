export default function phonebooks(state = [], action) {
    switch (action.type) {
        case 'LOAD_PHONEBOOK_SUCCESS':
            return action.phonebooks
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
            return state.map(item =>{
                if(item.id === action.id){
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