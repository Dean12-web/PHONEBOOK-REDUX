import axios from "axios"

const request = axios.create({
    baseURL: `http://localhost:3001/`,
    timeout: 2000,
    headers: { 'X-Custom-Header': 'foobar' }
})

const loadPhonebookSuccess = (phonebooks) => ({ type: "LOAD_PHONEBOOK_SUCCESS", phonebooks })

const loadPhonebookFailure = () => ({ type: "LOAD_PHONEBOOK_FAILURE" })

export const fetchData = () => (dispatch, getState) => {
    request.get(`api/phonebooks`).then((response) => {
        if (response.data.success) {
            // dispatch({type:'UPDATE_PARAMS',params:{isLoading : true}})
            // dispatch({type:'UPDATE_PARAMS',params:{page:getState().pagination.prevPage + 1}})
            dispatch(loadPhonebookSuccess(response.data.data.phonebooks))
            // dispatch({type:'UPDATE_PARAMS',params:{page:state.pagination.prevPage + 1}})
        } else {
            dispatch(loadPhonebookFailure())
        }
    }).catch((error) => {
        console.log(error)
        dispatch(loadPhonebookFailure())
    })
}
/** end load phonebooks */

const addPhonebookDraw = (phonebook) => ({ type: "ADD_PHONEBOOK_DRAW", phonebook })
const addPhonebookSuccess = (id, phonebook) => ({ type: "ADD_PHONEBOOK_SUCCESS", id, phonebook })
const addPhonebookFailure = (id) => ({ type: "ADD_PHONEBOOK_FAILURE", id })
export const addUser = (name, phone) => dispatch => {
    const id = Date.now()
    dispatch(addPhonebookDraw({ id:id, name: name, phone: phone }))
    // console.log(id,name,phone)
    return request.post(`api/phonebooks`, { name, phone }).then((response) => {
        console.log(response.data.data.phonebooks)
        dispatch(addPhonebookSuccess(id, response.data.data.phonebooks))
        // window.location.reload(); // Refresh the page
    }).catch((error) => {
        console.log(error)
        dispatch(addPhonebookFailure(id))
    })
}
/** end add phonebooks */
const updatePhonebookSuccess = (id, phonebook) => ({ type: "UPDATE_PHONEBOOK_SUCCESS", id, phonebook })
const updatePhonebookFailure = (id) => ({ type: "UPDATE_PHONEBOOK_FAILURE", id })
export const updateUser = (id, name, phone) => dispatch => {
    request.put(`api/phonebooks/${id}`, { name, phone }).then((response) => {
        dispatch(updatePhonebookSuccess(id, response.data.data.phonebook))
        window.location.reload(); // Refresh the page
    }).catch((error) => {
        console.log(error)
        dispatch(updatePhonebookFailure())
    })
}
/** end update phonebooks */

const removePhonebookSuccess = (id) => ({ type: "REMOVE_PHONEBOOK_SUCCESS", id })
const removePhonebookFailure = (id) => ({ type: "REMOVE_PHONEBOOK_FAILURE", id })
export const removeUser = (id) => dispatch => request.delete(`api/phonebooks/${id}`).then((response) => {
    dispatch(removePhonebookSuccess(id))
    // window.location.reload(); // Refresh the page
}).catch((error) => {
    console.log(error)
    dispatch(removePhonebookFailure())
})