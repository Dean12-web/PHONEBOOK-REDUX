import {combineReducers} from 'redux'
import phonebooks from './phonebooks'
import pagination from './pagination'
const rootReducer = combineReducers({
    phonebooks,
    pagination
})

export default rootReducer