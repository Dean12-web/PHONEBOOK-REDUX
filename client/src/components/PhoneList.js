import { useEffect} from 'react';
import {useSelector, useDispatch} from "react-redux"
import { fetchData} from '../actions/phonebooks';
import PhoneItem from "./PhoneItem"
export default function PhoneList({ remove, update }) {
    const phonebooks = useSelector((state) => state.phonebooks)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(fetchData())
    }, [dispatch])
    return (
        <div style={{ height: '500px', overflowY: "scroll" }}>
            <ul>
                {
                    phonebooks.map((phonebook) => (
                        <PhoneItem
                            key={phonebook.id}
                            phonebook={phonebook}
                            update={update}
                            remove={() => remove(phonebook.id)} />
                    ))
                }
            </ul>
        </div>
    )
}