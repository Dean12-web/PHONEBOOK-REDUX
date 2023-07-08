import PhoneItem from "./PhoneItem"
import { useEffect} from 'react';
import {useSelector, useDispatch} from "react-redux"
import { fetchData} from '../actions/phonebooks';
export default function PhoneList({ phonebooks, remove, update }) {
    const data = useSelector((state) => state.phonebooks)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(fetchData())
    }, [dispatch])
    return (
        <div style={{ height: '500px', overflowY: "scroll" }}>
            <ul>
                {
                    data.map((phonebook) => (
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