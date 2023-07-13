export default function phonebooks(state = [], action) {
    switch (action.type) {
        case 'LOAD_PHONEBOOK_SUCCESS':
            // Handling For Avoiding Duplicated Data
            const newPhonebooks = action.phonebooks.map(item => ({ ...item, sent: true }));
            const existingIds = state.map(item => item.id);
            const filteredPhonebooks = newPhonebooks.filter(item => !existingIds.includes(item.id));
            return [...state, ...filteredPhonebooks];
        case 'LOAD_PHONEBOOK_FAILURE':
        case 'ADD_PHONEBOOK_DRAW':
            return [{ ...action.phonebook, sent: true }, ...state]
        case 'ADD_PHONEBOOK_SUCCESS':
            return state.map(item => {
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
                    item.name = action.phonebook.name
                    item.phone = action.phonebook.phone
                }
                return item
            })
        case 'REMOVE_PHONEBOOK_SUCCESS':
            return state.filter(item => item.id !== action.id)
        case 'REMOVE_PHONEBOOK_FAILURE':
        default:
            return state
    }
}