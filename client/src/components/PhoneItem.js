import { useState } from "react"
import axios from "axios"
import { useDispatch } from "react-redux"
import { removeUser } from "../actions/phonebooks"
import { updateUser } from "../actions/phonebooks";

export default function PhoneItem({ phonebook,updateAvatar }) {
    const dispatch = useDispatch()
    const [isEdit, setIsEdit] = useState(false)
    const [name, setName] = useState(phonebook.name)
    const [phone, setPhone] = useState(phonebook.phone)
    const handleImageClick = () => {
        const fileInput = document.createElement("input")
        fileInput.type = "file"
        fileInput.accept = "image/*"
        fileInput.addEventListener("change", (event) => {
            const file = event.target.files[0]
            const formData = new FormData()
            formData.append("avatar", file)

            axios
                .put(`http://localhost:3001/api/phonebooks/${phonebook.id}/avatar`, formData)
                .then((response) => {
                    updateAvatar(phonebook.id, response.data.data.avatar)
                })
                .catch(() => {
                    
                })
                window.location.reload(); // Refresh the page
        })
        fileInput.click()
    }
    return (
        <li className="card bg-secondary mb-1">
            <div className="image">
                <img src={phonebook.avatar ? `http://localhost:3001/images/${phonebook.avatar}` : '/profile.png'}
                    className="img-fluid"
                    alt=""
                    onClick={handleImageClick} />
            </div>
            <div className="info">
                <span>{isEdit ? (
                    <input
                        type="text"
                        value={name}
                        onChange={event => setName(event.target.value)}
                    />
                ) : phonebook.name
                }</span><br />
                <span>{isEdit ? (
                    <input
                        type="text"
                        value={phone}
                        onChange={event => setPhone(event.target.value)}
                    />
                ) : phonebook.phone
                }</span><br />


                {isEdit ? (
                    <div className="action">
                        <button
                            className="btn btn-xs"
                            type="button"
                            onClick={() => { dispatch(updateUser(phonebook.id, name, phone)); setIsEdit(false) }} >
                            <i className="fa-solid fa-floppy-disk fa-sm" />
                        </button>
                        <button
                            className="btn btn-xs"
                            type="button"
                            onClick={() => {
                                setIsEdit(false);
                                setName(phonebook.name);
                                setPhone(phonebook.phone);
                            }}>
                            <i className="fa-solid fa-arrow-left fa-sm" />
                        </button>
                    </div>
                ) :
                    <div className="action">
                        <button
                            className="btn btn-xs"
                            type="button"
                            onClick={() =>
                                setIsEdit(true)}>
                            <i className="fa-solid fa-pen-to-square fa-sm" />
                        </button>
                        <button
                            className="btn btn-xs"
                            type="button"
                            onClick={()=> dispatch(removeUser(phonebook.id))}>
                            <i className="fa-solid fa-trash fa-sm" />
                        </button>
                    </div>
                }
            </div>
        </li>
    )
}