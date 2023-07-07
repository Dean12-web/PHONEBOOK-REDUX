export default function phonebooks(state = [], action) {
    switch (action.type) {
        case 'LOAD_PHONEBOOK_SUCCESS':
            // console.log(action)
            return action.phonebooks.map(item => ({...item, sent: true}))

        case 'ADD_PHONEBOOK_DRAW':
            return [{ ...action.phonebook, sent: true }, ...state]
        case 'ADD_PHONEBOOK_SUCCESS':
            return state.map(item => {
                // console.log(item)
                // console.log(action.phonebook.id)
                if (item.id === action.id) {
                    item.id = action.phonebook.id
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
        case 'LOAD_PHONEBOOK_FAILURE':
        default:
            return state
    }
}